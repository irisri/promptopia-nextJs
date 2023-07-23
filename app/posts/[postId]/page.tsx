import { Text, TextPreset } from "@components/text";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await res.json();
  console.log("data", data);

  return (
    <div>
      <Text preset={TextPreset.H1} text={`New Post ${params.postId}`} />
      <p>{data.body}</p>
    </div>
  );
};

export default PostPage;
