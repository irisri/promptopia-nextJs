import { PromptProps } from "@app/create-prompt/page";
import { PromptCard } from "./promptCard";

export interface UserPrompt {
  _id: string;
  email: string;
  username: string;
  image: string;
}

export interface DatabasePromptProps extends PromptProps {
  creator: UserPrompt;
  _id: string;
}

interface PromptCartListProps {
  data: DatabasePromptProps[];
  handleTagClick: () => void;
}

export const PromptCartList = ({
  data,
  handleTagClick,
}: PromptCartListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          handleTagClick={handleTagClick}
          post={post}
        />
      ))}
    </div>
  );
};
