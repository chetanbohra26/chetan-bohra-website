import { lazy, Suspense } from 'react';
import Introduction from './Introduction';
import Projects from './Projects';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

// Lazy load below-the-fold components
const Technologies = lazy(() => import('./Technologies'));
const ScheduleMeet = lazy(() => import('./ScheduleMeet'));

const Content = () => {
	return (
		<main className='container flex flex-col flex-grow scroll-smooth px-2 sm:px-4 py-2'>
			<Introduction />

			<Separator className='w-2/3 mx-auto my-8' />

			<Label className='text-center text-xl'>
				Senior Software Engineer at{' '}
				<a
					href='https://squareboat.com'
					target='_blank'
					rel='noreferrer'
					className='text-green-500 hover:text-lime-300 underline'
					aria-label='Squareboat'
				>
					Squareboat
				</a>
			</Label>

			<Separator className='w-2/3 mx-auto my-8' />

			<Projects />

			<Separator className='w-2/3 mx-auto my-8' />

			<Suspense fallback={<div className='min-h-[400px]' />}>
				<Technologies />
			</Suspense>

			<Separator className='w-2/3 mx-auto mt-8' />

			<Suspense fallback={<div className='min-h-[1000px]' />}>
				<ScheduleMeet />
			</Suspense>
		</main>
	);
};

export default Content;
