import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Label } from '@/components/ui/label';
import linkedinIconImg from '@/assets/linkedin-in.svg';
import githubIconImg from '@/assets/github.svg';
import mailIconImg from '@/assets/envelope-regular.svg';
import { LightbulbIcon } from 'lucide-react';

const Navbar = () => {
	return (
		<nav className="bg-black border-b border-gray-900">
			<div className="mx-auto max-w-7xl px-2">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex items-center justify-start ml-4">
						<LightbulbIcon className="h-8 w-8 hover:scale-125 hover:fill-yellow-500 transition ease-in-out duration-300" />
					</div>
					{/* <Label className="text-center text-lg">
						Hi, I am Chetan Bohra
					</Label> */}
					<div className="flex">
						<a
							href="https://www.linkedin.com/in/chetanbohra26"
							target="_blank"
							rel="noreferrer"
						>
							<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
								<AvatarImage src={linkedinIconImg} />
								<AvatarFallback>Linkedin</AvatarFallback>
							</Avatar>
						</a>
						<a
							href="https://github.com/chetanbohra26"
							target="_blank"
							rel="noreferrer"
						>
							<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
								<AvatarImage src={githubIconImg} />
								<AvatarFallback>Github</AvatarFallback>
							</Avatar>
						</a>
						<a
							href="mailto:chetanbohra26@gmail.com"
							target="_blank"
							rel="noreferrer"
						>
							<Avatar className="h-8 w-8 p-1.5 mr-4 hover:scale-125 transition ease-in-out">
								<AvatarImage src={mailIconImg} />
								<AvatarFallback>Mail</AvatarFallback>
							</Avatar>
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
