import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default PostsLayout;
