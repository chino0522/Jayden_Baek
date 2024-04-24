import Image from 'next/image';

type ExperienceItemProps = {
    name: string;
    image: string;
    description: string;
    tech: string[];
}

const Experience = () => {

    const ExperienceData = [
        {
            name: 'Community of Gaurdians',
            iamge: '/profile/CoGs.png',
            description: 'Community of Gaurdians is a non-profit organization that aims to provide a safe and inclusive space for people to connect and support each other. I am currently volunteering as a software developer for the organization.',
            tech: ['React.js', 'Strapi', 'Firebase']
        }
    ]

    const ExperienceItem = ({ name, image, description, tech }: ExperienceItemProps) => {
        return (
            <div className='w-96 h-auto bg-gray-100 rounded-3xl p-5 m-5 flex flex-col'>
                <h1 className='text-2xl font-bold mb-3'>{name}</h1>
                <Image
                    src={image}
                    width={200}
                    height={50}
                    alt={name}
                    className='self-center'
                />
                <p>{description}</p>
                <div className='flex flex-wrap'>
                    {tech.map((tech, index) => (
                        <div key={index} className='m-2 p-2 bg-gray-200 rounded-2xl'>{tech}</div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className='flex w-full p-5 my-5 justify-center'>
            {ExperienceData.map((experience, index) => (
                <ExperienceItem key={index} name={experience.name} image={experience.iamge} description={experience.description} tech={experience.tech} />
            ))}
        </div>
    );
}

export default Experience;