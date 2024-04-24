import React from 'react';
import Image from 'next/image';
import ProfileItemTitle from './components/ProfileItemTitle';
import Skills from './Skills/Skills';
import Experiences from './Experience/Experiences';
import Projects from './Projects/Projects';

export default function Profile() {
    return (
        <div className='m-5 p-5 w-full'>
            <div className='my-10 w-full flex flex-wrap justify-evenly items-center'>
                <Image
                    src="/contact/profile.jpeg"
                    width={128}
                    height={128}
                    className='rounded-3xl'
                    alt="profile picture"
                />
                <div className='p-2 w-96 text-justify'>
                    <h1 className="text-2xl font-bold my-5 text-center md:text-start">Hi, I&apos;m Jayden Baek 👋🏻</h1>
                    <p>
                        I am 19 years old and currently in my final term of the Computer Systems Technology (CST) program at BCIT (Brisith Columbia Institution of Technology).
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