import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, TextProps } from "react-native";

type Props = TextProps & {
  variant?: keyof typeof style;
  color?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedText({ variant, color, ...rest }: Props) {
  const colors = useThemeColors();

  return (
    <Text
      style={[
        style[variant ?? "body3"],
        { color: colors[color ?? "grayDark"] },
      ]}
      {...rest}
    />
  );
}

const style = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  headline1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 6,
    lineHeight: 12,
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
});
