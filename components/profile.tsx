import { Text, TextPreset } from "./text";
import { DatabasePromptProps } from "./promptCartList";

import { PromptCard } from "./promptCard";

interface ProfileProps {
  name: string;
  description: string;
  data: DatabasePromptProps[];
  handleEdit: (post: DatabasePromptProps) => void;
  handleDelete: (post: DatabasePromptProps) => void;
}

export const Profile = (props: ProfileProps) => {
  const { name, description, data, handleDelete, handleEdit } = props;

  return (
    <div>
      <Text
        preset={TextPreset.H1}
        text={`${name} Profile`}
        tailWindStyle="mb-8"
      />
      <Text preset={TextPreset.P} text={description} />

      <div className="mt-10 prompt_layout">
        {data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={() => {}}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleEdit={() => handleEdit && handleEdit(post)}
            />
          );
        })}
      </div>
    </div>
  );
};
