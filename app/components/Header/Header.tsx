'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type HeaderItemProps = {
    itemName: string;
    pathName: string;
}

const Header = () => {

    const HeaderItem = ({ itemName, pathName }: HeaderItemProps) => {
        const currentPathname = usePathname();
    
        const isActive = currentPathname === pathName;
        const textColor = isActive ? 'text-white' : 'text-black';
        const bgColor = isActive ? 'bg-black' : 'bg-transparent';
    
        return (
            <div className={`${textColor} group relative my-4 mx-3 px-4 py-2 md:px-10 flex items-center justify-center flex-grow-0 flex-shrink-0 cursor-pointer transition duration-300 ease-in-out w-24 md:w-32 text-center rounded-2xl overflow-hidden`}>
                <div className={`absolute inset-0 ${bgColor} transition-all duration-300 ease-in-out`}></div>
                <div className="relative z-10">
                    {itemName}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white text-center sticky top-0 z-10 flex flex-wrap content-evenly justify-evenly">
            <div className="flex shrink-1 justify-evenly items-center">
                <Link href="/"><HeaderItem itemName="Profile" pathName='/' /></Link>
                <Link href="/blog"><HeaderItem itemName="Blog" pathName='/blog' /></Link>
                <Link href="/contact"><HeaderItem itemName="Contact" pathName='/contact' /></Link>
            </div>
        </div>
    );
}

export default Header;
