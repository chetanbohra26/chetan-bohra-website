import { InlineWidget } from 'react-calendly';

const ScheduleMeet = () => (
	<div className='flex scroll-hidden justify-center' id='schedule-meet'>
		<InlineWidget
			url='https://calendly.com/chetanbohra26/30min'
			styles={{
				height: '1000px',
				width: '100%',
			}}
		/>
	</div>
);

export default ScheduleMeet;
