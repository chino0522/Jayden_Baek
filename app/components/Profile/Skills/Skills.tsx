'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const skills = [
    'Java',
    'JavaScript',
    'C++',
    'Kotlin',
    'React.js',
    'Next.js',
    'Express.js',
    'Jakarta EE',
    'ASP.NET',
    'MySQL',
    'Supabase',
    'JetBrains',
    'Git',
    'Linux',
  ];

  const SkillItem = ({ skill }: { skill: string }) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.5
    });

    return (
      <div ref={ref} className={`flex flex-col items-center m-2 p-2 rounded-3xl w-32 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src={`/skills/${skill}.png`}
          width={50}
          height={50}
          alt={skill}
        />
        <p>{skill}</p>
      </div>
    );
  };

  return (
    <div className='w-full my-10'>
      <div className='flex flex-wrap justify-evenly max-w-3xl'>
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
