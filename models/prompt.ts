import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      //one to maney
      ref: "User",
    },
    prompt: {
      type: String,
      require: [true, "Prompt is requered"],
    },
    tag: {
      type: String,
      require: [true, "Tag is requered"],
    },
  },
  { versionKey: false }
);

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
