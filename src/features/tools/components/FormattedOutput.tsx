"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function FormattedOutput({ content }: { content: string }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose prose-zinc prose-invert max-w-none
      prose-headings:text-white prose-headings:font-semibold
      prose-p:text-zinc-300 prose-p:leading-7
      prose-li:text-zinc-300
      prose-pre:bg-transparent prose-pre:p-0"
    >
      <ReactMarkdown
        components={{
          h3: ({ children }) => (
            <h3 className="text-xl border-l-4 border-blue-500 pl-4 my-6 text-white">
              {children}
            </h3>
          ),

          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const codeContent = String(children).replace(/\n$/, "");

            if (!inline && match) {
              const language = match[1];

              return (
                <div className="relative my-6 rounded-xl border border-zinc-800 bg-[#141618] overflow-auto">

                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                      {language}
                    </span>

                    <button
                      onClick={() => handleCopy(codeContent)}
                      className="text-zinc-400 hover:text-white transition"
                    >
                      {copiedCode === codeContent ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <SyntaxHighlighter
                      language={language}
                      style={oneDark}
                      PreTag="div"
                      className="custom-scrollbar"
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "transparent",
                        overflowX: "auto",
                        minWidth: "100%"
                      }}
                    >
                      {codeContent}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }

            return (
              <code
                className="bg-zinc-800 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}