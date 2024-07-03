const Post = async ({ title, createdDate }: PostProps) => {
    const date = new Date(createdDate).toLocaleDateString();
    return (
        <div className='cursor-pointer text-center m-2 p-3 min-h-24 min-w-72 max-w-72 flex flex-col flex-wrap justify-center items-center border rounded-md border-solid border-slate-900'>
            <p className='text-md font-bold'>{title}</p>
            <div className='text-gray-500 text-sm'>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default Post;

interface PostProps {
    title: string | ""
    createdDate: string | ""
}

