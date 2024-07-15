'use client';

import { useState, useEffect, useRef } from 'react';
import PostCard from './components/PostCard';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import Fuse from 'fuse.js';


const PostList = ({ posts }: { posts: PostData[] }) => {
  return (
    <div className='w-full flex flex-col justify-start items-center flex-wrap'>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className='w-4/5 m-1 p-2 bg-white border border-neutral-50 shadow-md rounded-md flex justify-between transition-all duration-500 hover:bg-neutral-100 hover:scale-105'>
          <p className='w-2/3 px-3'>{post.title}</p>
          <p className='w-1/3 text-center'>{post.postCreatedDate}</p>
        </Link>
      ))}
    </div>
  );
}

const Blog = () => {

  const effectRan = useRef(false);

  const [posts, setPosts] = useState<PostData[]>([]);
  const [query, setQuery] = useState('');

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    return data;
  };

  useEffect(() => {

    // Prevents useEffect twice due to StrictMode
    if (effectRan.current) return;

    fetchPosts().then((data) => {
      if (!data) {
        setPosts([]);
        return;
      }
      setPosts(data);
    }).catch((error) => {
      console.error(error);
      setPosts([]);
    });

    return () => {
      effectRan.current = true;
    }
  }, []);

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
  coverImagePath: string;
  postCreatedDate: string;
}

export default Blog;
