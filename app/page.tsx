import { Text, TextPreset } from "@components/text";
import { Feed } from "@components/feed";

export default function Home() {
  return (
    <div>
      <Text
        text={"Discover & Share"}
        preset={TextPreset.H1}
        tailWindStyle="text-center bg-gradient-to-r bg-gradient-to-t from-amaranth to-off-white bg-clip-text text-transparent"
      />
      <Text
        text={"AI-Powered prompt"}
        preset={TextPreset.H2}
        tailWindStyle="text-center bg-gradient-to-r bg-gradient-to-t from-amaranth to-off-white bg-clip-text text-transparent pt-4"
      />

      <Text
        preset={TextPreset.P}
        tailWindStyle="text-center pt-16 text-off-white"
        text={
          "Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts"
        }
      />

      <Feed />
    </div>
  );
}
