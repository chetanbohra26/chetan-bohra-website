import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

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
	const [iconPositions, setIconPositions] = useState<Icon[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [targetRotation, setTargetRotation] = useState<{
		x: number;
		y: number;
		startX: number;
		startY: number;
		distance: number;
		startTime: number;
		duration: number;
	} | null>(null);
	const animationFrameRef = useRef<number>(0);
	const rotationRef = useRef({ x: 0, y: 0 });
	const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
	const imagesLoadedRef = useRef<boolean[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(dpr, dpr);
			}

			paramsRef.current = getParamsForSize(rect.width);
		};

		resize();
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, []);

	// Create icon canvases once when icons/images change
	useEffect(() => {
		if (!icons && !images) return;

		const items = icons || images || [];
		imagesLoadedRef.current = new Array(items.length).fill(false);

		const dpr = window.devicePixelRatio || 1;
		const OFFSCREEN_SIZE = Math.ceil(MAX_ICON_SIZE * MAX_SCALE * dpr);

		const newIconCanvases = items.map((item, index) => {
			const offscreen = document.createElement("canvas");
			offscreen.width = OFFSCREEN_SIZE;
			offscreen.height = OFFSCREEN_SIZE;
			const padding = offscreen.width * 0.08;
			const offCtx = offscreen.getContext("2d");

			if (offCtx) {
				if (images) {
					// Handle image URLs directly
					const img = new Image();
					img.crossOrigin = "anonymous";
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

						// Draw the image
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
					img.src = "data:image/svg+xml;base64," + btoa(svgString);
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

	// Generate initial icon positions on a sphere
	useEffect(() => {
		const items = icons || images || [];
		const newIcons: Icon[] = [];
		const numIcons = items.length || 20;

		// Fibonacci sphere parameters
		const offset = 2 / numIcons;
		const increment = Math.PI * (3 - Math.sqrt(5));

		for (let i = 0; i < numIcons; i++) {
			const y = i * offset - 1 + offset / 2;
			const r = Math.sqrt(1 - y * y);
			const phi = i * increment;

			const x = Math.cos(phi) * r;
			const z = Math.sin(phi) * r;

			const { radius } = paramsRef.current!;
			newIcons.push({
				x: x * radius,
				y: y * radius,
				z: z * radius,
				scale: 1,
				opacity: 1,
				id: i,
			});
		}
		setIconPositions(newIcons);
	}, [icons, images]);

	// Handle mouse events
	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect || !canvasRef.current) return;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;

		const { x: rx, y: ry } = rotationRef.current;
		const cosX = Math.cos(rx);
		const sinX = Math.sin(rx);
		const cosY = Math.cos(ry);
		const sinY = Math.sin(ry);

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const { iconSize } = paramsRef.current!;

		iconPositions.forEach((icon) => {
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

				setTargetRotation({
					x: targetX,
					y: targetY,
					startX: currentX,
					startY: currentY,
					distance,
					startTime: performance.now(),
					duration,
				});
				return;
			}
		});

		setIsDragging(true);
		setLastMousePos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			setMousePos({ x, y });
		}

		if (isDragging) {
			const deltaX = e.clientX - lastMousePos.x;
			const deltaY = e.clientY - lastMousePos.y;

			rotationRef.current = {
				x: rotationRef.current.x + deltaY * 0.002,
				y: rotationRef.current.y + deltaX * 0.002,
			};

			setLastMousePos({ x: e.clientX, y: e.clientY });
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Animation and rendering
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const rect = canvas.getBoundingClientRect();
			const canvasWidth = rect.width;
			const canvasHeight = rect.height;
			const centerX = canvasWidth / 2;
			const centerY = canvasHeight / 2;
			const maxDistance = Math.sqrt(
				centerX * centerX + centerY * centerY
			);
			const dx = mousePos.x - centerX;
			const dy = mousePos.y - centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const { baseSpeed, maxSpeed } = paramsRef.current!;

			const speed =
				baseSpeed + (distance / maxDistance) * (maxSpeed - baseSpeed);

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
					setTargetRotation(null);
				}
			} else if (!isDragging) {
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

			iconPositions.forEach((icon, index) => {
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
					// Only try to render icons/images if they exist
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
					// Show numbered circles if no icons/images are provided
					ctx.beginPath();
					ctx.arc(0, 0, 20, 0, Math.PI * 2);
					ctx.fillStyle = "#4444ff";
					ctx.fill();
					ctx.fillStyle = "white";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.font = "16px Arial";
					ctx.fillText(`${icon.id + 1}`, 0, 0);
				}

				ctx.restore();
			});
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [icons, images, iconPositions, isDragging, mousePos, targetRotation]);

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className="rounded-lg w-full h-full"
			aria-label="3D Icon Cloud"
			role="img"
		/>
	);
}
