import Introduction from './Introduction';
import Projects from './Projects';
import Technologies from './Technologies';
import ScheduleMeet from './ScheduleMeet';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

const Content = () => {
	return (
		<div className="container flex flex-col flex-grow scroll-smooth px-2 sm:px-4 py-2">
			<Introduction />

			<Separator className="w-2/3 mx-auto my-8" />

			<Label className="text-center text-xl">
				Senior Software Engineer at {" "}
				<a
					href='https://squareboat.com'
					target='_blank'
					className='text-green-500 hover:text-lime-300 underline'
				>
					Squareboat
				</a>
			</Label>

			<Separator className="w-2/3 mx-auto my-8" />

			<Projects />

			<Separator className="w-2/3 mx-auto my-8" />

			<Technologies />

			<Separator className="w-2/3 mx-auto mt-8" />

			<ScheduleMeet />
		</div>
	);
};

export default Content;
