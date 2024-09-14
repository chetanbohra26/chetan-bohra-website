import { InlineWidget } from 'react-calendly';

import Introduction from './Introduction';
import Projects from './Projects';
import Technologies from './Technologies';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const Content = () => {
	return (
		<div className="flex flex-col flex-grow scroll-smooth px-4 py-2">
			<Introduction />

			<Separator className="w-2/3 mx-auto my-8" />

			<Label className="text-center text-xl">
				Senior Software Engineer at {" "}
				<a
					href='https://squareboat.com'
					target='_blank'
					className='text-green-500'
				>
					Squareboat
				</a>
			</Label>

			<Separator className="w-2/3 mx-auto my-8" />

			<Projects />

			<Separator className="w-2/3 mx-auto my-8" />

			<Technologies />

			<Separator className="w-2/3 mx-auto mt-8" />

			<div className="flex scroll-hidden justify-center" id="calendly">
				<InlineWidget
					url="https://calendly.com/chetanbohra26/30min"
					styles={{
						height: '1000px',
						width: '100%',
					}}
				/>
			</div>
		</div>
	);
};

export default Content;
