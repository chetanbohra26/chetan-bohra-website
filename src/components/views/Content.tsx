import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';

import profileImg from '@/assets/photo_touched.webp';
import nestImg from '@/assets/nestjs.svg';
import nodeImg from '@/assets/nodejs.svg';
import reactImg from '@/assets/react.svg';
import awsImg from '@/assets/aws.svg';
import tensorflowImg from '@/assets/tensorflow.svg';
import esImg from '@/assets/elasticsearch.svg';
import redisImg from '@/assets/redis.svg';
import mysqlImg from '@/assets/mysql.svg';
import pgImg from '@/assets/postgresql.svg';
import mongoImg from '@/assets/mongo.svg';
import socketIoImg from '@/assets/socket-io.svg';
import gitImg from '@/assets/git.svg';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

const icons = [
	{ img: nestImg, alt: 'NestJS' },
	{ img: nodeImg, alt: 'NodeJS' },
	{ img: reactImg, alt: 'ReactJS' },
	{ img: awsImg, alt: 'AWS' },
	{ img: tensorflowImg, alt: 'Tensorflow' },
	{ img: esImg, alt: 'Elastic Search' },
	{ img: redisImg, alt: 'Redis' },
	{ img: mysqlImg, alt: 'MySQL' },
	{ img: pgImg, alt: 'Postgres' },
	{ img: mongoImg, alt: 'Mongo DB' },
	{ img: socketIoImg, alt: 'Socket.io' },
	{ img: gitImg, alt: 'Git' },
];

const Content = () => {
	return (
		<div className="flex flex-col flex-grow scroll-smooth bg-zinc-950 px-4">
			<Avatar className="w-[300px] h-[300px] mx-auto my-8">
				<AvatarImage src={profileImg} />
				<AvatarFallback>Chetan</AvatarFallback>
			</Avatar>

			<Label className="text-center text-4xl pt-4">
				Hi, I am Chetan Bohra
			</Label>

			<Label className="text-center text-2xl py-2">
				I have been working as a software developer since 4 years
			</Label>

			<Label className="text-center text-xl pb-4">
				Current working at{' '}
				<a href="https://squareboat.com" target="_blank">
					<span className="font-bold">Squareboat</span>
				</a>
			</Label>
			<Separator className="w-1/2 mx-auto bg-white my-4" />

			<Label className="text-center text-xl py-4 pb-8">
				Few of the technologies I have worked with
			</Label>

			<div className="mx-auto flex grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-8">
				{icons.map((icon, index) => (
					<Tooltip key={index}>
						<TooltipTrigger>
							<div className="rounded-full bg-white">
								<img
									className="h-20 w-20 p-4 transition ease-in-out hover:p-3"
									src={icon.img}
									alt={icon.alt}
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent
							className="bg-dark text-white"
							side="bottom"
						>
							<span>{icon.alt}</span>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</div>
	);
};

export default Content;
