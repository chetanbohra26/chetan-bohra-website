import { Label } from '@radix-ui/react-label';
import { IconCloud } from '../ui/icon-cloud';
import { Badge } from '../ui/badge';
import { Icons } from '../icons';

const technologies = [
	{ label: 'AWS', icon: Icons.aws },
	{ label: 'NestJS', icon: Icons.nestjs },
	{ label: 'NodeJS', icon: Icons.nodejs },
	{ label: 'Typescript', icon: Icons.ts },
	{ label: 'PostgreSQL', icon: Icons.postgres },
	{ label: 'MySQL', icon: Icons.mysql },
	{ label: 'MongoDB', icon: Icons.mongo },
	{ label: 'ExpressJS', icon: Icons.express },
	{ label: 'React', icon: Icons.react },
	{ label: 'Redis', icon: Icons.redis },
	{ label: 'Elasticsearch', icon: Icons.elasticsearch },
	{ label: 'Socket.IO', icon: Icons.socketio },
	{ label: 'HTML', icon: Icons.html },
	{ label: 'CSS', icon: Icons.css },
	{ label: 'JavaScript', icon: Icons.js },
	{ label: 'Kubernetes', icon: Icons.kubernetes },
	{ label: 'NGINX', icon: Icons.nginx },
	{ label: 'Docker', icon: Icons.docker },
	{ label: 'Git', icon: Icons.github },
	{ label: 'Stripe', icon: Icons.stripe },
	{ label: 'PayPal', icon: Icons.paypal },
	{ label: 'Android', icon: Icons.android },
];

const Technologies = () => {
	return (
		<div className='flex flex-col mb-8 mx-auto'>
			<Label className='text-center text-xl pb-4'>
				These are few of my magic ingredients
			</Label>

			<div className='flex pb-4 mx-auto'>
				<div className='flex flex-wrap justify-center gap-2'>
					{technologies.map(({ label }) => (
						<Badge key={label} variant='secondary'>
							{label}
						</Badge>
					))}
				</div>
			</div>

			<div className='flex w-100 justify-center'>
				<div className='w-full aspect-square max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]'>
					<IconCloud
						icons={technologies.map(({ label, icon: Icon }) => (
							<Icon key={label} aria-hidden='true' />
						))}
					/>
				</div>
			</div>
		</div>
	);
};

export default Technologies;
