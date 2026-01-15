import { memo, useMemo } from 'react';
import { InlineWidget } from 'react-calendly';

const ScheduleMeet = memo(() => {
	const widgetStyles = useMemo(
		() => ({
			height: '1000px',
			width: '100%',
		}),
		[]
	);

	return (
		<div className='flex scroll-hidden justify-center' id='schedule-meet'>
			<InlineWidget
				url='https://calendly.com/chetanbohra26/30min'
				styles={widgetStyles}
			/>
		</div>
	);
});

ScheduleMeet.displayName = 'ScheduleMeet';

export default ScheduleMeet;
