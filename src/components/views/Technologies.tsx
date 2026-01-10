import { Label } from '@radix-ui/react-label';
import { IconCloud } from '../ui/icon-cloud';
import { Badge } from '../ui/badge';

import { Icons } from '../icons';

const slugs = [
	'NestJS',
	'NodeJS',
	'ExpressJS',
	'Typescript',
	'React',
	'Redis',
	'PostgreSQL',
	'MySQL',
	'Elasticsearch',
	'AWS',
	'Socket.IO',
	'MongoDB',
	'Android',
	'HTML',
	'CSS',
	'JavaScript',
	'NGINX',
	'Docker',
	'Git',
	'Stripe',
	'PayPal',
];

const Technologies = () => {
	return (
		<div className='flex flex-col mb-8 mx-auto'>
			<Label className='text-center text-xl pb-4'>
				These are few of my magic ingredients
			</Label>

			<div className='flex pb-4 mx-auto'>
				<div className='flex flex-wrap justify-center gap-2'>
					{slugs.map((slug) => (
						<Badge key={slug} variant='secondary'>
							{slug}
						</Badge>
					))}
				</div>
			</div>

			<div className='flex w-100 justify-center'>
				<div className='w-full aspect-square max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]'>
					<IconCloud
						icons={[
							<Icons.android key='android' />,
							<Icons.aws key='aws' />,
							<Icons.css key='css' />,
							<Icons.docker key='docker' />,
							<Icons.elasticsearch key='elasticsearch' />,
							<Icons.github key='github' />,
							<Icons.html key='html' />,
							<Icons.js key='js' />,
							<Icons.mongo key='mongo' />,
							<Icons.mysql key='mysql' />,
							<Icons.nestjs key='nestjs' />,
							<Icons.nodejs key='nodejs' />,
							<Icons.paypal key='paypal' />,
							<Icons.postgres key='postgres' />,
							<Icons.react key='react' />,
							<Icons.redis key='redis' />,
							<Icons.socketio key='socketio' />,
							<Icons.stripe key='stripe' />,
							<Icons.ts key='ts' />,
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Technologies;
