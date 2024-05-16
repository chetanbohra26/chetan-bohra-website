import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';

import profileImg from '@/assets/photo_me.webp';
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
import { Button } from '../ui/button';
import { ArrowRight, PlusCircleIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { TypeAnimation } from 'react-type-animation';

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
	{
		icon: (
			<PlusCircleIcon className="h-20 w-20 p-2 fill-black hover:scale-125 transition ease-in-out duration-200" />
		),
		alt: 'More to come',
	},
];

const sequence = [
	'Chetan Bohra',
	2000,
	'a Fullstack dev',
	2000,
	'a Backend dev',
	2000,
	'a Frontend dev',
	2000,
	'a talent you need',
	2000,
];

const Content = () => {
	return (
		<div className="flex flex-col flex-grow scroll-smooth px-4 py-2">
			<div className="flex">
				<div className="flex grid grid-cols-1 md:grid-cols-2 my-2">
					<div className="border-dashed border-2 mx-auto p-2 rounded-full">
						<Avatar className="w-[300px] h-[300px] mx-auto">
							<AvatarImage src={profileImg} />
							<AvatarFallback>Chetan</AvatarFallback>
						</Avatar>
					</div>

					<div className="flex flex-col justify-center">
						<Label className="font-virgil text-center md:text-start text-4xl pt-4">
							<span className="italic">Hello,</span> I am{' '}
							<span className="text-green-500 hover:text-lime-400">
								<TypeAnimation
									sequence={sequence}
									repeat={Infinity}
								/>
							</span>
						</Label>

						<Label className="text-center md:text-start text-2xl py-2">
							I am a software developer with a passion to build
							great products. Open to discuss anything tech
							related.
						</Label>

						<Button
							className="mx-auto md:mx-0 md:mr-auto my-4 bg-black gap-2 transition ease-in-out duration-500"
							variant="outline"
							onClick={() =>
								window.open('mailto:chetanbohra26@gmail.com')
							}
						>
							Discuss over mail
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>

			<Separator className="w-2/3 mx-auto my-8 bg-slate-800" />

			<div className="flex flex-col">
				<Label className="text-center text-xl pb-8">
					These are few of my magic ingredients
				</Label>

				<div className="mx-auto flex grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8">
					{icons.map((icon, index) => (
						<div className="flex flex-col gap-2" key={index}>
							<div className="rounded-full bg-white flex-grow mx-auto">
								{icon.icon || (
									<img
										className="h-20 w-20 p-4 hover:scale-125 transition ease-in-out duration-200"
										src={icon.img}
										alt={icon.alt}
									/>
								)}
							</div>
							<Label className="text-center font-plain">
								{icon.alt}
							</Label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Content;
