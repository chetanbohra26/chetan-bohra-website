import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";


const Projects = () => {
    const [projects] = useState([
        {
            title: 'Marketing Planner',
            link: 'https://brandniti.drreddys.com',
            role: 'Fullstack developer - React, NestJS, Docker, AWS',
            description: 'An internal tool used by Dr. Reddy\'s to identify high-value doctors and plan marketing campaigns to boost sales'
        },
        {
            title: 'OTT Platform (Confidential)',
            role: 'Backend developer - Node.js, AWS',
            description: 'A well known content streaming platform used by millions of users across the globe'
        },
        {
            title: 'ACadru',
            link: 'https://acadru.com',
            role: 'Fullstack developer - React, NestJS, AWS, Elasticsearch',
            description: 'An Ed-Tech platform that aims to prepare students for their career'
        },
        {
            title: 'BrokerBuk',
            link: 'https://play.google.com/store/apps/details?id=com.brokerbuk.app',
            role: 'Backend developer - NestJS, Docker, AWS, Elasticsearch',
            description: 'Mobile app for brokers and owners to share their properties with their network'
        },
        {
            title: 'Habitat Automations',
            link: 'https://habitatautomations.com',
            role: 'Freelancer: CSS + React Optimizations',
            description: 'A startup based around home automations and security'
        },
    ]);

    return (
        <div className="flex flex-col mb-4 mx-auto">
            <Label className="text-center text-xl mb-4">
                Cool stuff I worked on
            </Label>

            <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                {
                    projects.map((proj, index) => (
                        <Card className='w-100 md:w-[300px] flex flex-col' key={index}>
                            <CardHeader>
                                <CardTitle className={`flex text-green-500 ${proj.link && 'hover:text-green-300'}`}>
                                    <a
                                        href={proj?.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {proj.title}
                                    </a>
                                </CardTitle>
                                <CardDescription>
                                    {proj.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {proj.role}
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default Projects;