export enum TextPreset {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  P = "p",
  Small = "small",
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
          <h2 className={`text-4xl font-bold ${tailWindStyle}`}>{text}</h2>
        );
      case TextPreset.H3:
        return (
          <h3 className={`text-3xl font-semibold ${tailWindStyle}`}>{text}</h3>
        );
      case TextPreset.H4:
        return (
          <h3 className={`text-2xl font-medium ${tailWindStyle}`}>{text}</h3>
        );
      case TextPreset.P:
        return (
          <p className={`text-base font-normal ${tailWindStyle}`}>{text}</p>
        );
      default:
        return <p className={`text-sm font-light ${tailWindStyle}`}>{text}</p>;
    }
  };

  return renderText();
};
