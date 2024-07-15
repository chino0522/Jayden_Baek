import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { getPostDataBySlug } from '@/lib/posts';
import { IoChevronBack } from "react-icons/io5";
import React from 'react';
import CodeBlock from '../components/CodeBlock';

interface Params {
    slug: string;
}

export default async function Post({ params }: { params: Params }) {
    const { content } = await getPostDataBySlug(params.slug);

    return (
        <div>
            <div className='py-5 mx-10 xl:mx-72 2xl:mx-96 cursor-pointer hidden xl:block lg:absolute lg:top-1 lg:left-0 lg:z-40'>
                <Link href="/blog" className='flex items-center font-bold'>
                    <IoChevronBack className='text-lg md:text-2xl' /> posts
                </Link>
            </div>
            <div className="w-full py-10 px-5 md:px-40 xl:px-72 2xl:px-96">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold my-6">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-bold my-6 mt-10">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-bold my-6 mt-10 w-full text-center">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-lg font-bold my-6 mb-10 text-slate-400">{children}</h4>,
                        p: ({ children }) => <p className="my-6">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside my-6">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside my-6">{children}</ol>,
                        li: ({ children }) => <li className="ml-4 my-6">{children}</li>,
                        table: ({ children }) => (
                            <div className="overflow-x-auto">
                                <table className="table-auto my-6 w-full">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => {
                            return <tr className="flex">{children}</tr>
                        },
                        th: ({ children }) => {
                            return (
                                <th className="flex-1 border border-gray-300 p-2">
                                    {children}
                                </th>
                            );
                        },
                        td: ({ children }) => {
                            return (
                                <td className="flex-1 border border-gray-300 p-2 text-xs md:text-sm">
                                    {children}
                                </td>
                            );
                        },
                        hr: () => <hr className="my-6 border-gray-300" />,
                        a: ({ children, href }) => <a className="text-blue-500 hover:underline" href={href as string}>{children}</a>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-500 pl-4 my-4 italic text-gray-600">{children}</blockquote>,
                        code({ node, inline, className, children, ...props }: any) {
                            return (
                                <CodeBlock className={className} {...props}>
                                    {children}
                                </CodeBlock>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
