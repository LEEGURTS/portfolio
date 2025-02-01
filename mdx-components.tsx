import type { MDXComponents } from "mdx/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const mdxComponents: MDXComponents = {
  // 코드 (```)
  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter style={vs2015} language={match[1]} PreTag="p">
        {String(children)
          .replace(/\n$/, "")
          .replace(/\n&nbsp;\n/g, "")
          .replace(/\n&nbsp\n/g, "")}
      </SyntaxHighlighter>
    ) : (
      <SyntaxHighlighter
        style={vs2015}
        background="green"
        language="textile"
        PreTag="p"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  // 인용문 (>)
  blockquote({ children, ...props }) {
    return (
      <blockquote
        style={{
          background: "#7afca19b",
          padding: "1px 15px",
          borderRadius: "10px",
        }}
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  em({ children, ...props }) {
    return (
      <span style={{ fontStyle: "italic" }} {...props}>
        {children}
      </span>
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
