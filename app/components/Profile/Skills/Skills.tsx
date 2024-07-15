'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const skills =
  {
    languages: [
      'Java',
      'JavaScript',
      'C++',
      'Kotlin',
      'C Sharp',
    ],
    frameworks: [
      'React.js',
      'Next.js',
      'Express.js',
      'Jakarta EE',
      'ASP.NET',
    ],
    tools: [
      'MySQL',
      'Supabase',
      'JetBrains',
      'Git',
      'Linux',
    ],
  }

  const SkillItemContainer = ({ title, skills }: { title: string, skills: string[] }) => {
    return (
      <div className={`px-5 md:px-10 md:mx-5 flex flex-wrap justify-evenly text-center`}>
        <h2 className='text-xl font-bold my-5 '>{title}</h2>
        <div className='p-5 w-full flex flex-wrap justify-center items-center'>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    );
  }

  const SkillItem = ({ skill }: { skill: string }) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.5
    });

    return (
      <div ref={ref} className={`flex flex-col items-center m-2 p-2 rounded-3xl w-24 md:w-32 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-20'}`}>
        <Image
          src={`/skills/${skill}.png`}
          width={50}
          height={50}
          alt={skill}
        />
        <p>{skill === 'C Sharp' ? 'C#' : skill}</p>
      </div>
    );
  };

  return (
    <div className='w-full my-10 flex flex-wrap justify-center'>
      <SkillItemContainer title='languages' skills={skills.languages} />
      <SkillItemContainer title='frameworks' skills={skills.frameworks} />
      <SkillItemContainer title='tools' skills={skills.tools} />
    </div>
  );
};

export default Skills;
