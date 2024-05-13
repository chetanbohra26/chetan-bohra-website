import avatarImg from '@/assets/avatar.jpg';
import linkedinIcon from '@/assets/linkedin-in.svg';
import githubIcon from '@/assets/github.svg';

const Navbar = () => {
	return (
		<nav className="bg-black">
			<div className="mx-auto max-w-7xl px-2">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-start">
						<div className="flex flex-shrink-0 items-start">
							<img
								className="h-8 w-auto rounded-full"
								src={avatarImg}
								alt="Your Company"
							/>
						</div>
					</div>
					<div className="inset-y-0 flex items-center pr-2 sm:ml-4">
						<a
							href="https://www.linkedin.com/in/chetanbohra26"
							target="_blank"
						>
							<img
								className="h-8 w-8"
								src={linkedinIcon}
								alt=""
							/>
						</a>
					</div>
					<div className="inset-y-0 flex items-center pr-2 sm:ml-4">
						<a
							href="https://github.com/chetanbohra26"
							target="_blank"
						>
							<img className="h-8 w-8" src={githubIcon} alt="" />
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
