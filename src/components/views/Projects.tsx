import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const projectList = [
    {
        title: 'Marketing Planner',
        link: 'https://brandniti.drreddys.com',
        role: 'Fullstack developer - MERN, NestJS, AWS',
        description: 'An internal tool used by Dr. Reddy\'s Laboratories to plan marketing campaigns'
    },
    {
        title: 'ACadru',
        link: 'https://acadru.com',
        role: 'Fullstack developer - MERN, NestJS, AWS',
        description: 'An Ed-Tech platform that aims to prepare students for their career'
    },
    {
        title: 'Habitat Automations',
        link: 'https://habitatautomations.com',
        role: 'Frontend developer - Bootstrap',
        description: 'A startup based around home automations and security'
    },
    {
        title: 'OTT Platform (Confidential)',
        role: 'Backend developer - Node.js',
        description: 'Well known OTT platform used by millions of users'
    }
]

const Projects = () => {
    return (
        <div className="flex flex-col mb-4 mx-auto">
            <Label className="text-center text-xl mx-auto mb-4">
                Cool stuff I worked on
            </Label>

            <div className="flex grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                    projectList.map((proj, index) => (
                        <Card className='mw-[300px] flex flex-col flex-fill mb-2' key={index}>
                            <CardHeader>
                                <CardTitle className="flex">
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