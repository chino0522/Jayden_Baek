"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { FaCopy } from "react-icons/fa";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeContent = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeContent);
        alert("Code copied to clipboard!");
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
                <FaCopy />
            </button>
        </div>
    ) : (
        <code className="text-blue-300 px-1" {...props}>
            {children}
        </code>
    );
};

export default CodeBlock;
