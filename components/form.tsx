import { FormEvent, ChangeEvent } from "react";
import { LinkProps } from "next/link";

import { Text, TextPreset } from "./text";
import { PromptProps } from "@app/create-prompt/page";

interface FromPrompt {
  type: string;
  post: PromptProps;
  setPost: (cb: (value: PromptProps) => PromptProps) => void;
  submitting: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => {};
}

export const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: FromPrompt) => {
  return (
    <section>
      <Text preset={TextPreset.H1} text={`${type} Post`} />
      <Text
        preset={TextPreset.P}
        text={`${type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform`}
        tailWindStyle="mt-8"
      />
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-7 glassmorphism"
      >
        <label className="font-satoshi font-semibold">Your AI Prompt</label>
        <textarea
          value={post.prompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setPost((prevState) => ({ ...prevState, prompt: e.target.value }))
          }
        />
      </form>
    </section>
  );
};
