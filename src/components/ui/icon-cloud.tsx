import React, { useEffect, useRef, useCallback } from 'react';
import { renderToString } from 'react-dom/server';

interface Icon {
	x: number;
	y: number;
	z: number;
	scale: number;
	opacity: number;
	id: number;
}

interface IconCloudProps {
	icons?: React.ReactNode[];
	images?: string[];
}

type CloudParams = {
	radius: number;
	depth: number;
	baseSpeed: number;
	maxSpeed: number;
	iconSize: number;
};

type TargetRotation = {
	x: number;
	y: number;
	startX: number;
	startY: number;
	distance: number;
	startTime: number;
	duration: number;
};

function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3);
}

function getParamsForSize(size: number): CloudParams {
	// mobile
	if (size < 320) {
		return {
			radius: size * 0.38,
			depth: size * 1.6,
			baseSpeed: 0.004,
			maxSpeed: 0.012,
			iconSize: 40,
		};
	}

	// tablet
	if (size < 480) {
		return {
			radius: size * 0.42,
			depth: size * 2.0,
			baseSpeed: 0.004,
			maxSpeed: 0.012,
			iconSize: 60,
		};
	}

	// desktop
	return {
		radius: size * 0.45,
		depth: size * 2.6,
		baseSpeed: 0.004,
		maxSpeed: 0.012,
		iconSize: 80,
	};
}

const MOTION_EPSILON = 0.0004;
const MAX_ICON_SIZE = 80;
const MAX_SCALE = 1.15;

export function IconCloud({ icons, images }: IconCloudProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const paramsRef = useRef<CloudParams | null>(null);
	const animationFrameRef = useRef<number>(0);
	const rotationRef = useRef({ x: 0, y: 0 });
	const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
	const imagesLoadedRef = useRef<boolean[]>([]);

	// Animation values as refs — avoids re-creating the RAF loop on every mouse move
	const iconPositionsRef = useRef<Icon[]>([]);
	const isDraggingRef = useRef(false);
	const lastMousePosRef = useRef({ x: 0, y: 0 });
	const mousePosRef = useRef({ x: 0, y: 0 });
	const targetRotationRef = useRef<TargetRotation | null>(null);

	// Cache canvas dimensions — updated on resize, avoids getBoundingClientRect every frame
	const canvasSizeRef = useRef({ width: 0, height: 0 });

	// Tracked in a ref so the useEffect cleanup can cancel a pending debounced call on unmount
	const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const updateCanvasSize = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);
		}

		canvasSizeRef.current = { width: rect.width, height: rect.height };
		paramsRef.current = getParamsForSize(rect.width);
	}, []);

	// Debounce resize handler — timeoutId stored in a ref so it can be cleared on unmount
	const debouncedResize = useCallback(() => {
		clearTimeout(resizeTimeoutRef.current);
		resizeTimeoutRef.current = setTimeout(updateCanvasSize, 150);
	}, [updateCanvasSize]);

	useEffect(() => {
		updateCanvasSize();
		window.addEventListener('resize', debouncedResize);
		return () => {
			window.removeEventListener('resize', debouncedResize);
			clearTimeout(resizeTimeoutRef.current);
		};
	}, [updateCanvasSize, debouncedResize]);

	// Create icon canvases once when icons/images change
	useEffect(() => {
		if (!icons && !images) return;

		const items = icons || images || [];
		imagesLoadedRef.current = new Array(items.length).fill(false);

		const dpr = window.devicePixelRatio || 1;
		const OFFSCREEN_SIZE = Math.ceil(MAX_ICON_SIZE * MAX_SCALE * dpr);

		const newIconCanvases = items.map((item, index) => {
			const offscreen = document.createElement('canvas');
			offscreen.width = OFFSCREEN_SIZE;
			offscreen.height = OFFSCREEN_SIZE;
			const padding = offscreen.width * 0.08;
			const offCtx = offscreen.getContext('2d');

			if (offCtx) {
				if (images) {
					// Handle image URLs directly
					const img = new Image();
					img.crossOrigin = 'anonymous';
					img.src = items[index] as string;
					img.onload = () => {
						offCtx.setTransform(1, 0, 0, 1, 0, 0);
						offCtx.clearRect(
							0,
							0,
							offscreen.width,
							offscreen.height
						);

						const radius = offscreen.width / 2;
						offCtx.beginPath();
						offCtx.arc(radius, radius, radius, 0, Math.PI * 2);
						offCtx.clip();

						offCtx.drawImage(
							img,
							padding,
							padding,
							offscreen.width - padding * 2,
							offscreen.height - padding * 2
						);

						imagesLoadedRef.current[index] = true;
					};
				} else {
					// Handle SVG icons
					offCtx.setTransform(1, 0, 0, 1, 0, 0);
					const scale = OFFSCREEN_SIZE / MAX_ICON_SIZE;
					offCtx.scale(scale, scale);
					const svgString = renderToString(
						item as React.ReactElement
					);
					const img = new Image();
					img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
					img.onload = () => {
						offCtx.clearRect(
							0,
							0,
							offscreen.width,
							offscreen.height
						);
						offCtx.drawImage(
							img,
							0,
							0,
							MAX_ICON_SIZE,
							MAX_ICON_SIZE
						);
						imagesLoadedRef.current[index] = true;
					};
				}
			}
			return offscreen;
		});

		iconCanvasesRef.current = newIconCanvases;
	}, [icons, images]);

	// Generate initial icon positions on a sphere — stores into ref, no re-render needed
	useEffect(() => {
		const items = icons || images || [];
		const newIcons: Icon[] = [];
		const numIcons = items.length || 20;

		// Fibonacci sphere distribution
		const offset = 2 / numIcons;
		const increment = Math.PI * (3 - Math.sqrt(5));

		if (!paramsRef.current) return;
		const { radius } = paramsRef.current;

		for (let i = 0; i < numIcons; i++) {
			const y = i * offset - 1 + offset / 2;
			const r = Math.sqrt(1 - y * y);
			const phi = i * increment;

			const x = Math.cos(phi) * r;
			const z = Math.sin(phi) * r;

			newIcons.push({
				x: x * radius,
				y: y * radius,
				z: z * radius,
				scale: 1,
				opacity: 1,
				id: i,
			});
		}
		iconPositionsRef.current = newIcons;
	}, [icons, images]);

	// Event handlers are now stable — all mutable values live in refs
	const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect || !canvasRef.current) return;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const { x: rx, y: ry } = rotationRef.current;
		const cosX = Math.cos(rx);
		const sinX = Math.sin(rx);
		const cosY = Math.cos(ry);
		const sinY = Math.sin(ry);

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const { iconSize } = paramsRef.current!;

		iconPositionsRef.current.forEach((icon) => {
			const rotatedX = icon.x * cosY - icon.z * sinY;
			const rotatedZ = icon.x * sinY + icon.z * cosY;
			const rotatedY = icon.y * cosX + rotatedZ * sinX;

			const screenX = centerX + rotatedX;
			const screenY = centerY + rotatedY;

			const { depth } = paramsRef.current!;
			const scale = Math.max(0.35, (rotatedZ + depth / 2) / depth);

			const radius = (iconSize / 2) * scale;

			const dx = x - screenX;
			const dy = y - screenY;

			if (dx * dx + dy * dy < radius * radius) {
				const targetX = -Math.atan2(
					icon.y,
					Math.sqrt(icon.x * icon.x + icon.z * icon.z)
				);
				const targetY = Math.atan2(icon.x, icon.z);

				const currentX = rotationRef.current.x;
				const currentY = rotationRef.current.y;
				const distance = Math.sqrt(
					Math.pow(targetX - currentX, 2) +
						Math.pow(targetY - currentY, 2)
				);

				const duration = Math.min(2000, Math.max(800, distance * 1000));

				targetRotationRef.current = {
					x: targetX,
					y: targetY,
					startX: currentX,
					startY: currentY,
					distance,
					startTime: performance.now(),
					duration,
				};
				return;
			}
		});

		isDraggingRef.current = true;
		lastMousePosRef.current = { x: e.clientX, y: e.clientY };
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			mousePosRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		}

		if (isDraggingRef.current) {
			const deltaX = e.clientX - lastMousePosRef.current.x;
			const deltaY = e.clientY - lastMousePosRef.current.y;

			rotationRef.current = {
				x: rotationRef.current.x + deltaY * 0.002,
				y: rotationRef.current.y + deltaX * 0.002,
			};

			lastMousePosRef.current = { x: e.clientX, y: e.clientY };
		}
	}, []);

	const handleMouseUp = useCallback(() => {
		isDraggingRef.current = false;
	}, []);

	// Animation loop — runs once on mount, reads all mutable values from refs.
	// Page Visibility API pauses the loop when the tab is hidden to save CPU.
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Use cached size — avoids layout reflow every frame
			const { width: canvasWidth, height: canvasHeight } = canvasSizeRef.current;
			const centerX = canvasWidth / 2;
			const centerY = canvasHeight / 2;
			const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

			const { x: mx, y: my } = mousePosRef.current;
			const dx = mx - centerX;
			const dy = my - centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const { baseSpeed, maxSpeed } = paramsRef.current!;

			const speed =
				baseSpeed + (distance / maxDistance) * (maxSpeed - baseSpeed);

			const targetRotation = targetRotationRef.current;
			if (targetRotation) {
				const elapsed = performance.now() - targetRotation.startTime;
				const progress = Math.min(1, elapsed / targetRotation.duration);
				const easedProgress = easeOutCubic(progress);

				rotationRef.current = {
					x:
						targetRotation.startX +
						(targetRotation.x - targetRotation.startX) *
							easedProgress,
					y:
						targetRotation.startY +
						(targetRotation.y - targetRotation.startY) *
							easedProgress,
				};

				if (progress >= 1) {
					targetRotationRef.current = null;
				}
			} else if (!isDraggingRef.current) {
				const dxNorm = dx / canvasWidth;
				const dyNorm = dy / canvasHeight;

				if (
					Math.abs(dxNorm) > MOTION_EPSILON ||
					Math.abs(dyNorm) > MOTION_EPSILON
				) {
					rotationRef.current = {
						x: rotationRef.current.x + dyNorm * speed,
						y: rotationRef.current.y + dxNorm * speed,
					};
				}
			}

			const { x: rx, y: ry } = rotationRef.current;
			const cosX = Math.cos(rx);
			const sinX = Math.sin(rx);
			const cosY = Math.cos(ry);
			const sinY = Math.sin(ry);

			iconPositionsRef.current.forEach((icon, index) => {
				const rotatedX = icon.x * cosY - icon.z * sinY;
				const rotatedZ = icon.x * sinY + icon.z * cosY;
				const rotatedY = icon.y * cosX + rotatedZ * sinX;

				const { depth } = paramsRef.current!;
				const scale = Math.max(0.35, (rotatedZ + depth / 2) / depth);

				const opacity = Math.max(
					0.35,
					Math.min(1, (rotatedZ + depth * 0.45) / depth)
				);

				ctx.save();

				const drawX = Math.round(centerX + rotatedX);
				const drawY = Math.round(centerY + rotatedY);

				ctx.translate(drawX, drawY);
				ctx.scale(scale, scale);
				ctx.globalAlpha = opacity;

				if (icons || images) {
					if (
						iconCanvasesRef.current[index] &&
						imagesLoadedRef.current[index]
					) {
						const { iconSize } = paramsRef.current!;
						const iconRadius = iconSize / 2;
						ctx.drawImage(
							iconCanvasesRef.current[index],
							-iconRadius,
							-iconRadius,
							iconSize,
							iconSize
						);
					}
				} else {
					ctx.beginPath();
					ctx.arc(0, 0, 20, 0, Math.PI * 2);
					ctx.fillStyle = '#4444ff';
					ctx.fill();
					ctx.fillStyle = 'white';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.font = '16px Arial';
					ctx.fillText(`${icon.id + 1}`, 0, 0);
				}

				ctx.restore();
			});

			// Only schedule next frame when the tab is visible
			if (!document.hidden) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		};

		// Resume animation when tab becomes visible again
		const handleVisibilityChange = () => {
			if (!document.hidden) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		};

		animate();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []); // Runs once — all mutable values are read from refs

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className='rounded-lg w-full h-full'
			aria-label='3D Icon Cloud'
			role='img'
		/>
	);
}
