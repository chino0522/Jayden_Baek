import React from 'react';
import Image from 'next/image';
import Experience from './Experience/Experience';
import ProfileItemTitle from './components/ProfileItemTitle';

export default function Profile() {
    return (
        <div className='m-5 my-10 p-5 w-full'>
            <div className='w-full flex flex-wrap justify-evenly items-center'>
                <Image
                    src="/contact/profile.jpeg"
                    width={128}
                    height={128}
                    className='rounded-3xl'
                    alt="profile picture"
                />
                <div className='p-2 w-96 text-justify'>
                    <h1 className="text-2xl font-bold my-5 text-center md:text-start">Hi, I&apos;m Jayden Baek</h1>
                    <p>
                        Hello, my name is Jayden (Jinho) Baek. I am 19 years old and currently in my final term of the Computer Systems Technology (CST) program at BCIT.
                    </p>
                </div>
            </div>
            <Experience />
        </div>
    )
}