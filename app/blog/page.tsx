import Link from 'next/link';
import Image from 'next/image';
import { getAllPostsTitleAndDate } from '@/lib/posts';

const PostCard = (post: PostData) => {
  return (
    <div className='m-5 w-80'>
      <Link key={post.slug} href={`/blog/${post.slug}`} className='m-5 p-5 w-80 h-80 rounded-lg bg-black text-gray-100 flex flex-col justify-between items-center'>
        <Image src='/posts/placeholder.png' alt='placeholder' width={320} height={240} className='p-1 rounded-md' />
        <p className='text-lg md:text-xl font-bold p-3 text-center'>{post.title}</p>
        <p>{post.createdAt}</p>
      </Link>
    </div>
  );
}

const PostList = ({ posts }: { posts: PostData[] }) => {
  return (
    <div className='w-full flex flex-col justify-start items-center flex-wrap'>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className='w-4/5 m-1 p-2 bg-black text-gray-100 rounded-md flex justify-between'>
          <p className='w-2/3 px-3'>{post.title}</p>
          <p className='w-1/3 text-center'>{post.createdAt}</p>
        </Link>
      ))}
    </div>
  );
}

const Blog = () => {

  const posts: PostData[] = getAllPostsTitleAndDate();

  return (
    <div className="w-full py-10 md:p-10">
      <div className='hidden md:flex justify-center flex-wrap'>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
      <div className='w-full my-10 h-auto md:hidden'>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

interface PostData {
  slug: string;
  title: string;
  createdAt: string;
}

export default Blog;
