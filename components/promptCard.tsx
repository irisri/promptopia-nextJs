import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Text, TextPreset } from "./text";
import { DatabasePromptProps } from "./promptCartList";

interface PromptCardProps {
  post: DatabasePromptProps;
  handleTagClick: (tag: string) => void;
  handleEdit?: (post: DatabasePromptProps) => void;
  handleDelete?: (post: DatabasePromptProps) => void;
}

export const PromptCard = ({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}: PromptCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [copied, setCopied] = useState("");
  const timeOutId = useRef<NodeJS.Timeout | null>(null);

  const canUserChangePost =
    session?.user?.id === post.creator._id && pathname === "/profile";

  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) return router.push("/profile");

    // router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    timeOutId.current = setTimeout(() => setCopied(""), 3000);
  };

  useEffect(() => {
    return () => {
      if (timeOutId && timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    };
  }, []);

  return (
    <div className="prompt_card">
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row gap-5 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div>
            <Text
              preset={TextPreset.H4}
              text={post.creator.username}
              tailWindStyle="text-jelly-bean"
            />
            <Text
              preset={TextPreset.Small}
              text={post.creator.email}
              tailWindStyle="text-off-white-50"
            />
          </div>
        </div>

        <div className="copy_btn self-center" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick icon" : "copy icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <div>
        <Text
          preset={TextPreset.P}
          text={post.prompt}
          tailWindStyle="font-satoshi my-3 text-amaranth"
        />
        <button
          onClick={() => {
            console.log("tag");
            handleTagClick && handleTagClick(post.tag);
          }}
        >
          <Text
            preset={TextPreset.Small}
            text={post.tag}
            tailWindStyle="font-satoshi text-jelly-bean"
          />
        </button>
      </div>

      {canUserChangePost ? (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleEdit && handleEdit(post)}
            className="text-jelly-bean px-2 py-1 border-2 rounded-lg border-off-white-50"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete && handleDelete(post)}
            className="text-jelly-bean px-2 py-1 border-2 rounded-lg border-off-white-50"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};
