type ProfileItemTitleProps = {
    name: string;
}

export default function ProfileItemTitle({ name }: ProfileItemTitleProps) {
    return (
        <div className='w-full'>
            <h1 className="p-5 my-5 text-3xl font-bold text-start md:pl-52">{name}</h1>
        </div>
    )
}