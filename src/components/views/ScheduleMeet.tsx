import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { InlineWidget } from 'react-calendly';

const ScheduleMeet = memo(() => {
	const [shouldLoad, setShouldLoad] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{
				rootMargin: '200px', // Start loading 200px before the component is visible
			}
		);

		observer.observe(containerRef.current);

		return () => observer.disconnect();
	}, []);

	const widgetStyles = useMemo(
		() => ({
			height: '1000px',
			width: '100%',
		}),
		[]
	);

	return (
		<div
			ref={containerRef}
			className='flex scroll-hidden justify-center'
			id='schedule-meet'
		>
			{shouldLoad ? (
				<InlineWidget
					url='https://calendly.com/chetanbohra26/30min'
					styles={widgetStyles}
				/>
			) : (
				<div style={widgetStyles} className='flex items-center justify-center'>
					<div className='text-gray-400'>Loading calendar...</div>
				</div>
			)}
		</div>
	);
});

ScheduleMeet.displayName = 'ScheduleMeet';

export default ScheduleMeet;
