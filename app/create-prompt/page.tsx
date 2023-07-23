"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Form } from "@components/form";

import { Text, TextPreset } from "@components/text";

export interface PromptProps {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptProps>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
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
