const MarkdownLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="prose max-w-full lg:max-w-[60rem] px-8 lg:px-16 pt-32 pb-48 ">
      {children}
    </article>
  );
};

export default MarkdownLayout;
