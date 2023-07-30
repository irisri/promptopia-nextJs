import { FormEvent, ChangeEvent } from "react";
import Link from "next/link";

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
        className="mt-10 flex flex-col gap-2 glassmorphism"
      >
        <label className="font-satoshi font-semibold">Your AI Prompt</label>
        <textarea
          className="form_textarea mb-6"
          value={post.prompt}
          required
          placeholder="Write your prompt here..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setPost((prevState) => ({ ...prevState, prompt: e.target.value }))
          }
        />

        <label className="font-satoshi font-semibold">Tag</label>
        <input
          className="form_input"
          required
          placeholder="#tag"
          value={post.tag}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPost((prevState) => ({ ...prevState, tag: e.target.value }))
          }
        />

        <div className="flex justify-end items-center mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-sm text-gray-400">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full text-white bg-amaranth"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
