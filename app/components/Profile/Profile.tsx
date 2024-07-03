import React from 'react';
import Image from 'next/image';
import ProfileItemTitle from './components/ProfileItemTitle';
import Skills from './Skills/Skills';
import Experiences from './Experience/Experiences';
import Projects from './Projects/Projects';

export default function Profile() {
    return (
        <div className='m-5 p-5 w-full flex justify-center flex-col items-center'>
            <div className='my-10 w-4/6 flex flex-wrap justify-evenly items-center'>
                <Image
                    src="/contact/profile.jpeg"
                    width={128}
                    height={128}
                    className='rounded-3xl'
                    alt="profile picture"
                />
                <div className='p-2 my-10 w-96 text-justify'>
                    <h1 className="text-2xl font-bold my-5 text-center md:text-start">Hi, I&apos;m Jayden Baek 👋🏻</h1>
                    <p>
                        I am 20 years old and just graduated from the Computer Systems Technology (CST) program at BCIT. I enjoy building websites and learning system administration. Feel free to check out my work and blog posts!
                    </p>
                </div>
            </div>
            <div>
                <ProfileItemTitle name='Experiences' />
                <Experiences />
            </div>
            <div>
                <ProfileItemTitle name='Skills' />
                <Skills />
            </div>
            <div>
                <ProfileItemTitle name='Projects' />
                <Projects />
            </div>
        </div>
    )
}