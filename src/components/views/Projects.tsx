import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const Projects = () => {
    const [projects] = useState([
        {
            title: 'GrayPorter',
            link: 'https://grayporter.com',
            role: 'Project Lead',
            description: 'An e-commerce platform designed for purchasing affordable electronics globally',
            points: [
                'Led the development of the entire system from the ground up',
                'Coordinated with the frontend and design teams to deliver a smooth user experience',
                'Integrated multiple payment options, such as Stripe, PayPal, Affirm, and Klarna',
            ],
            technologies: [
                'NestJS',
                'Postgres',
                'Redis',
                'AWS',
                'Payment Integration',
            ],
        },
        {
            title: 'Marketing Planner',
            link: 'https://brandniti.drreddys.com',
            role: 'Fullstack developer',
            description: 'An internal tool for Dr. Reddy\'s brand managers to identify high-value doctors and plan marketing campaigns',
            points: [
                'Processed high-volume sales data (~10M/month) for insights',
                'Identified high-value doctors for campaign tracking using various criteria',
                'Developed campaign management and spend tracking across divisions',
                'Built dashboards to measure the impact of marketing efforts',
            ],
            technologies: [
                'NestJS',
                'Postgres',
                'Redis',
                'React',
                'Docker',
                'AWS',
            ],
        },
        {
            title: 'OTT Platform (Confidential)',
            link: '/',
            role: 'Backend developer',
            description: 'A popular Indian content streaming platform used by millions',
            points: [
                'Designed and maintained clean APIs for multiple frontend teams',
                'Integrated APIs with multiple partners for content and analytics',
                'Led POCs and R&D for new features and optimizations',
                'Worked with user data to enhance personalization and engagement',
            ],
            technologies: [
                'Node.js',
                'Redis (Cache + DB)',
                'AWS',
                'OpenTelemetry',
            ],
        },
        {
            title: 'ACadru',
            link: 'https://acadru.com',
            role: 'Fullstack developer',
            description: 'An Ed-Tech platform helping students prepare for their careers',
            points: [
                'Designed and implemented core features across four codebases',
                'Optimized query performance for MySQL + Elasticsearch',
                'Debugged regression issues and provided scalable fixes',
            ],
            technologies: [
                'NestJS',
                'MySQL',
                'Redis',
                'React',
                'AWS',
                'Elasticsearch',
            ],
        },
        {
            title: 'BrokerBuk',
            link: 'https://play.google.com/store/apps/details?id=com.brokerbuk.app',
            role: 'Backend developer',
            description: 'A real estate app for brokers and owners to manage and share properties',
            points: [
                'Led technical solutioning, mentoring, and code reviews',
                'Developed dynamic forms using Backend For Frontend (BFF) architecture',
            ],
            technologies: [
                'NestJS',
                'Postgres',
                'Redis',
                'Google Maps',
                'AWS',
                'Elasticsearch',
                'Docker',
            ],
        },
        {
            title: 'Habitat Automations',
            link: 'https://habitatautomations.com',
            role: 'Freelancer (CSS + React Optimizations)',
            description: 'A startup based around home automations and security',
            points: [
                'Refactored and optimized the existing React codebase',
                'Ensured responsiveness across all pages',
                'Reduced page load times with performance improvements',
            ],
            technologies: [
                'React',
                'Bootstrap',
            ],
        },
    ]);

    return (
        <div className="flex flex-col mb-4 mx-auto">
            <Label className="text-center text-xl mb-4">
                Cool stuff I have worked on
            </Label>

            <div className="flex grid grid-cols-1 gap-4 mx-auto">
                {
                    projects.map((proj, index) => (
                        <Card className='w-100 flex flex-col' key={index}>
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex text-green-500 ${proj.link && 'hover:text-lime-300'}`}>
                                    <a
                                        href={proj?.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={proj.title}
                                    >
                                        {proj.title}
                                    </a>
                                </CardTitle>
                                <CardDescription>
                                    {proj.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {proj.points?.length > 0 && <ol className="ml-6 list-decimal mb-2">
                                    {
                                        proj.points?.map((point, index) => (
                                            <div key={index}>
                                                <li>{point}</li>
                                            </div>
                                        ))
                                    }
                                </ol>
                                }

                                {proj.role &&
                                    <div className="mb-2">
                                        <b>Role:</b> {proj.role}
                                    </div>
                                }

                                {proj.technologies?.length > 0 &&
                                    <div>
                                        <b>Technologies Used:</b> {proj.technologies?.join(', ')}
                                    </div>
                                }
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default Projects;
