import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostData } from '@/lib/posts';
import { IoChevronBack } from "react-icons/io5";

export default function Post({ params }: { params: Params }) {
    const { content } = getPostData(params.slug);
    return (
        <div>
            <div className='py-5 mx-10 xl:mx-72 2xl:mx-96 cursor-pointer hidden xl:block lg:absolute lg:top-1 lg:left-0 lg:z-40'>
                <Link href="/blog" className='flex items-center font-bold'>
                    <IoChevronBack className='text-lg md:text-2xl' /> posts
                </Link>
            </div>
            <div className="w-full p-10 md:px-40 xl:px-72 2xl:px-96">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                        h1: (props) => <h1 className="text-3xl font-bold my-4">{props.children}</h1>,
                        h2: (props) => <h2 className="text-2xl font-bold my-4">{props.children}</h2>,
                        h3: (props) => <h3 className="text-xl font-bold my-4">{props.children}</h3>,
                        p: (props) => <p className="my-4">{props.children}</p>,
                        ul: (props) => <ul className="list-disc list-inside my-4">{props.children}</ul>,
                        ol: (props) => <ol className="list-decimal list-inside my-4">{props.children}</ol>,
                        li: (props) => <li className="my-2">{props.children}</li>,
                        code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
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

// Define the type for the params
interface Params {
    slug: string;
}

// Define the type for the post data
interface PostData {
    id: string;
    title: string;
    contentHtml: string;
}
