import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import profileImg from '@/assets/photo_me.webp';

const sequence = [
    'Chetan Bohra',
    2000,
    'a fullstack developer',
    2000,
    'a backend developer',
    2000,
    'a frontend developer',
    2000,
    'a talent you need',
    2000,
];

const Introduction = () => {
    return (
        <div className="flex grid grid-cols-1 md:grid-cols-2 my-2">
            <div className="border-dashed border-2 mx-auto p-1 rounded-full">
                <Avatar className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] mx-auto">
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

                <a
                    className="mx-auto md:mx-0 md:mr-auto my-4 bg-black gap-2 transition ease-in-out duration-500 bg-black text-white hover:bg-white hover:text-black border flex p-2 rounded"
                    href="#calendly"
                >
                    Discuss over call
                    <ArrowRight />
                </a>
            </div>
        </div>
    )
}

export default Introduction;