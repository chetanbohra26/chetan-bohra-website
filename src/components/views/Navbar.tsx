import { LightbulbIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import linkedinIconImg from '@/assets/linkedin-in.svg';
import githubIconImg from '@/assets/github.svg';
import mailIconImg from '@/assets/envelope-regular.svg';

const Navbar = () => {
	return (
		<nav className="bg-black border-b border-gray-900">
			<div className="mx-auto max-w-7xl px-2">
				<div className="relative flex h-16 items-center justify-between">
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger asChild>
								<div className="flex items-center justify-start ml-4">
									<a href='#schedule-meet'>
										<LightbulbIcon className="h-8 w-8 hover:scale-125 hover:fill-yellow-500 transition ease-in-out duration-300" />
									</a>
								</div>
							</TooltipTrigger>
							<TooltipContent align='start'>
								<p>Have an idea?</p>
							</TooltipContent>
						</Tooltip>

						<div className="flex">
							<Tooltip delayDuration={200}>
								<TooltipTrigger asChild>
									<a
										href="https://www.linkedin.com/in/chetanbohra26"
										target="_blank"
										rel="noreferrer"
									>
										<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
											<AvatarImage src={linkedinIconImg} alt='Linkedin' />
											<AvatarFallback>Linkedin</AvatarFallback>
										</Avatar>
									</a>

								</TooltipTrigger>
								<TooltipContent align='center'>
									<p>LinkedIn</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip delayDuration={200}>
								<TooltipTrigger asChild>
									<a
										href="https://github.com/chetanbohra26"
										target="_blank"
										rel="noreferrer"
									>
										<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
											<AvatarImage src={githubIconImg} alt='Github' />
											<AvatarFallback>Github</AvatarFallback>
										</Avatar>
									</a>
								</TooltipTrigger>
								<TooltipContent align='center'>
									<p>Github</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip delayDuration={200}>
								<TooltipTrigger asChild>
									<a
										href="mailto:chetanbohra26@gmail.com"
										target="_blank"
										rel="noreferrer"
									>
										<Avatar className="h-8 w-8 p-1.5 mr-4 hover:scale-125 transition ease-in-out">
											<AvatarImage src={mailIconImg} alt='mail' />
											<AvatarFallback>Mail</AvatarFallback>
										</Avatar>
									</a>
								</TooltipTrigger>
								<TooltipContent align='center'>
									<p>Mail me</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
