"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa";
import { IoIosCheckmark} from "react-icons/io";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeContent = String(children).replace(/\n$/, '');

    const [copyState, setCopyState] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeContent);
        setCopyState(true);
        setTimeout(() => {
            setCopyState(false);
        }, 1500);
    };

    return !inline && match ? (
        <div className="relative">
            <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {codeContent}
            </SyntaxHighlighter>
            <button
                className="absolute top-2 right-2 bg-gray-500 transition-all duration-500 hover:scale-105 hover:bg-gray-300 text-white text-xs px-2 py-1 rounded"
                onClick={handleCopy}
            >
                {copyState ? <IoIosCheckmark /> : <FaCopy />}
            </button>
        </div>
    ) : (
        <code className="text-blue-300 px-1" {...props}>
            {children}
        </code>
    );
};

export default CodeBlock;
