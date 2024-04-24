'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
    const projects = [
        {
            title: 'CareLink',
            image: '/projects/CareLink.png',
            description: 'A social support website that allows students to have a safe space to chat with certified counsellors',
            tech: ['React.js', 'Express.js', 'Supabase'],
            github: 'https://github.com/BardiaTiM/CareLink',
            youtube: 'https://www.youtube.com/watch?v=4zMcxRqRwdw'
        },
        {
            title: 'WrightIntel',
            image: '/projects/WrightIntel.png',
            description: 'A website that utilizes a fine-tuned GPT-3 to provide detailed documents on aircraft law and policies for the US and Canada.',
            tech: ['EJS', 'Express.js', 'MongoDB'],
            github: 'https://github.com/BardiaTiM/wrightIntel-TLDR-AI',
            youtube: 'https://www.youtube.com/watch?v=2j0Qc3f2Xko'
        },
        {
            title: 'Zoom Zoom',
            image: '/projects/ZoomZoom.png',
            description: 'A top-down racing game developed in Java, accommodating multiple players and offering a controller interfaces.',
            tech: ['Java', 'MongoDB'],
            github: 'https://github.com/COMP2522/project-zoom-zoom',
            youtube: null
        }
    ]

    const ProjectItem = ({ title, image, description, tech, github, youtube }: { title: string, image: string, description: string, tech: string[], github: string, youtube: string }) => {
        const { ref, inView } = useInView({
            triggerOnce: false,
            threshold: 0.6  // Adjust this value based on when you want the animation to start
        });

        return (
            <div ref={ref} className={`w-96 h-auto rounded-3xl p-5 m-5 flex flex-col text-pretty transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className='text-2xl font-bold mb-3 text-center'>{title}</h1>
                <Image
                    src={image}
                    width={300}
                    height={100}
                    alt={title}
                    className='self-center p-2'
                />
                <p className='p-5 flex text-pretty'>{description}</p>
                <div className='flex flex-wrap justify-evenly p-2 md:p-0'>
                    {tech.map((tech, index) => (
                        <div key={index} className='flex p-2'>
                            <Image
                                src={`/skills/${tech}.png`}
                                width={25}
                                height={25}
                                alt={tech}
                                className='p-1'
                            />
                            <p>{tech}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-evenly my-5'>
                    <div className='flex flex-row justify-center'>
                        <Link href={github} target='_blank'>
                            <Image
                                src='/skills/GitHub.png'
                                width={30}
                                height={30}
                                alt='github'
                            />
                        </Link>
                    </div>
                    {youtube === null ? null : (
                        <div>
                            <Link href={youtube} target='_blank'>
                                <Image
                                    src='/skills/YouTube.png'
                                    width={30}
                                    height={30}
                                    alt='youtube'
                                />
                            </Link>
                        </div>
                    
                    ) }
                </div>
            </div>
        );
    }

    return (
        <div className='flex w-full p-5 justify-evenly flex-wrap'>
            {projects.map((project, index) => (
                <ProjectItem key={index} title={project.title} image={project.image} description={project.description} tech={project.tech} github={project.github} youtube={project.youtube} />
            ))}
        </div>
    );

}

export default Projects;