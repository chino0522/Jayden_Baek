'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './components/SearchBar';
import Fuse from 'fuse.js';

const PostCard = (post: PostData) => {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`} className='m-5 p-5 w-80 h-80 rounded-lg bg-black text-gray-100 flex flex-col justify-between items-start transition-all duration-500 hover:bg-slate-800 hover:scale-105'>
      <Image src='/posts/placeholder.png' alt='placeholder' width={320} height={240} className='p-1 rounded-md' />
      <p className='w-full text-lg md:text-xl font-bold p-3 text-center'>{post.title}</p>
      <p className='w-full '>{post.hashTags}</p>
      <p>{post.createdAt}</p>
    </Link>
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

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
    });
  }, []);
  
  const [posts, setPosts] = useState<PostData[]>([]);
  const [query, setQuery] = useState('');
  
  const fuse = new Fuse(posts, {
    keys: ['title', 'hashTags'],
  });

  const results = query ? fuse.search(query).map(result => result.item) : posts;

  return (
    <div className="w-full py-10 md:p-10 flex flex-col justify-center items-center">
      <SearchBar onSearch={setQuery} />
      <div className='hidden md:flex justify-center flex-wrap'>
        {results.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
      <div className='w-full my-10 h-auto md:hidden'>
        <PostList posts={results} />
      </div>
    </div>
  );
};

interface PostData {
  slug: string;
  title: string;
  hashTags: string;
  createdAt: string;
}

export default Blog;
