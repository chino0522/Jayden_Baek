'use client';
import { useInView } from 'react-intersection-observer';

type ProfileItemTitleProps = {
    name: string;
}

export default function ProfileItemTitle({ name }: ProfileItemTitleProps) {

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5  // Adjust this value based on when you want the animation to start
    });

    return (
        <div ref={ref} className={`w-full my-10 pt-10 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="my-5 text-3xl font-bold text-center">{name}</h1>
        </div>
    )
}
