"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@components/form";

export interface PromptProps {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptProps>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        setPost={setPost}
        type={"Create"}
        post={post}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
