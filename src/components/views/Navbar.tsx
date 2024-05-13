import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import avatarImg from '@/assets/avatar.jpg';
import linkedinIconImg from '@/assets/linkedin-in.svg';
import githubIconImg from '@/assets/github.svg';
import mailIconImg from '@/assets/envelope-regular.svg';

const Navbar = () => {
	return (
		<nav className="bg-black border-b border-gray-900 shadow-lg shadow-stone-900">
			<div className="mx-auto max-w-7xl px-2">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex items-center justify-start ml-4">
						<Avatar className="h-10 w-10 hover:scale-125 transition ease-in-out">
							<AvatarImage src={avatarImg} />
							<AvatarFallback>Linkedin</AvatarFallback>
						</Avatar>
					</div>
					<Label className="text-center text-lg">
						Hello, I am Chetan Bohra
					</Label>
					<div className="flex flex-column">
						<a
							href="https://www.linkedin.com/in/chetanbohra26"
							target="_blank"
						>
							<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
								<AvatarImage src={linkedinIconImg} />
								<AvatarFallback>Linkedin</AvatarFallback>
							</Avatar>
						</a>
						<a
							href="https://github.com/chetanbohra26"
							target="_blank"
						>
							<Avatar className="h-8 w-8 p-1.5 mr-2 hover:scale-125 transition ease-in-out">
								<AvatarImage src={githubIconImg} />
								<AvatarFallback>Github</AvatarFallback>
							</Avatar>
						</a>
						<a
							href="mailto:chetanbohra26@gmail.com"
							target="_blank"
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
