export enum TextPreset {
  H1 = "h1",
  H2 = "h2",
  P = "p",
}

interface TextProps {
  preset: TextPreset;
  text: string;
  tailWindStyle?: string;
}

export const Text = ({ preset, text, tailWindStyle }: TextProps) => {
  const renderText = () => {
    switch (preset) {
      case TextPreset.H1:
        return (
          <h1 className={`text-5xl font-extrabold ${tailWindStyle}`}>{text}</h1>
        );
      case TextPreset.H2:
        return (
          <h1 className={`text-4xl font-bold ${tailWindStyle}`}>{text}</h1>
        );
      default:
        return (
          <p className={`text-base font-normal ${tailWindStyle}`}>{text}</p>
        );
    }
  };

  return renderText();
};
