"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@components/form";

export interface PromptProps {
  prompt: string;
  tag: string;
}

// update-prompt

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptProps>({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (!promptId) return;
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!promptId) {
      console.error("Missing prompId");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
        type={"Edit"}
        post={post}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;
