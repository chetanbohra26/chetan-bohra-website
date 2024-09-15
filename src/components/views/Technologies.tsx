import { useState } from "react";

import { Label } from "@radix-ui/react-label";
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
import goImg from '@/assets/go.svg';

const Technologies = () => {
    const [icons] = useState([
        { img: nestImg, alt: 'NestJS' },
        { img: nodeImg, alt: 'Node.js' },
        { img: reactImg, alt: 'React.js' },
        { img: goImg, alt: 'Go' },
        { img: awsImg, alt: 'AWS' },
        { img: esImg, alt: 'Elastic Search' },
        { img: redisImg, alt: 'Redis' },
        { img: mysqlImg, alt: 'MySQL' },
        { img: pgImg, alt: 'Postgres' },
        { img: mongoImg, alt: 'Mongo DB' },
        { img: socketIoImg, alt: 'Socket.io' },
        { img: tensorflowImg, alt: 'Tensorflow' },
        /*{
            icon: (
                <PlusCircleIcon className="h-20 w-20 p-2 fill-black hover:scale-125 transition ease-in-out duration-200" />
            ),
            alt: 'More to come',
        },*/
    ]);

    return (
        <div className="flex flex-col mb-8 mx-auto">
            <Label className="text-center text-xl pb-8">
                These are few of my magic ingredients
            </Label>

            <div className="mx-auto flex grid grid-cols-2 xxs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-8">
                {icons.map((icon, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                        <div className="rounded-full bg-white flex-grow mx-auto">
                            {/*icon?.icon ||*/ (
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
    )
}

export default Technologies;