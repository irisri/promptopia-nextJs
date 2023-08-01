"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Profile } from "@components/profile";
import { DatabasePromptProps } from "@components/promptCartList";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [posts, setPosts] = useState<DatabasePromptProps[]>([]);

  const handleEdit = (post: DatabasePromptProps) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: DatabasePromptProps) => {
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter(
        (postItem) => postItem._id !== post._id
      );

      setPosts(filteredPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (!session?.user?.id) return;
    fetchPost();
  }, [session?.user?.id]);

  return (
    <div>
      <Profile
        name="My"
        description="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProfilePage;
