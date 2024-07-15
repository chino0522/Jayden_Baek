import Image from 'next/image';
import Link from 'next/link';

interface PostData {
    slug: string;
    title: string;
    hashTags: string;
    coverImagePath: string;
    postCreatedDate: string;
}

const PostCard = (post: PostData) => {
    return (
        <Link key={post.slug} href={`/blog/${post.slug}`} className='m-5 p-5 w-80 rounded-xl bg-white shadow-lg border border-neutral-50 flex flex-col justify-between items-start transition-all duration-500 hover:bg-neutral-100 hover:scale-105'>
            <div className="w-full relative pt-[100%]">
                <Image src={post.coverImagePath} alt='placeholder' layout='fill' objectFit='cover' className='rounded-t-xl' />
            </div>
            <p className='w-full text-lg md:text-xl font-bold p-2 text-center'>{post.title}</p>
            <p className='w-full py-1'>{post.hashTags}</p>
            <div className='w-full flex justify-between'>
                <p>{post.postCreatedDate}</p>
            </div>
        </Link>
    );
}

export default PostCard;
