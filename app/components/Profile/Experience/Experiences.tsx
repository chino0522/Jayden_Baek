'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

type ExperienceItemProps = {
    name: string;
    image: string;
    description: string;
    tech: string[];
};

type IntersectionObserverInit = {
    triggerOnce: boolean;
    threshold: number;
};

const Experiences = () => {
  const experienceData = [
    {
      name: 'Community of Guardians',
      image: '/profile/CoGs.png',
      description: 'Community of Guardians is a non-profit organization that aims to provide a safe and inclusive space for people to connect and support each other. I am currently volunteering as a full-stack software developer for the organization.',
      tech: ['React.js', 'Strapi', 'Firebase']
    }
  ];

  const ExperienceItem = ({ name, image, description, tech }: ExperienceItemProps) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.5
    });

    return (
      <div ref={ref} className={`w-72 md:w-96 h-auto bg-gray-900 text-gray-300 rounded-3xl p-5 m-5 flex flex-col text-pretty transition-all hover:bg-slate-800 hover:scale-105 duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className='text-2xl font-bold mb-3 text-center'>{name}</h1>
        <Image
          src={image}
          width={200}
          height={50}
          alt={name}
          className='self-center'
        />
        <p>{description}</p>
        <div className='flex flex-wrap justify-evenly p-2 md:p-0 my-6'>
          {tech.map((tech, index) => (
            <div key={index} className='flex'>
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
      </div>
    );
  };

  return (
    <div className='flex w-full p-5 justify-center'>
      {experienceData.map((experience, index) => (
        <ExperienceItem key={index} {...experience} />
      ))}
    </div>
  );
};

export default Experiences;
