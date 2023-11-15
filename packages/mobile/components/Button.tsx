import React, { useMemo } from "react";
import {
  PressableProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native";

import Text from "../components/Text";
import colors from "../design/colors";

interface ButtonProps extends PressableProps {
  color?: string;
  variant?: "fill" | "outline" | "none"
}

const Button = React.forwardRef<Pressable, ButtonProps>((props, forwardedRef) => {
  const { variant = "none", color, style, children, ...otherProps } = props;

  const variants: Record<string, StyleProp<ViewStyle>>= {
    fill,
    outline,
    none
  };

  if (!variants[variant]) {
    throw new Error("The variant doesn't exist.");
  }

  const currentVarient = variants[variant];
  const composedStyles = StyleSheet.compose(currentVarient, style as StyleProp<ViewStyle>);
  const isText = !React.isValidElement(children) && typeof children === "string";

  const child = useMemo(() => {
    if (isText) {
      return (
        <Text
          color={color}
          style={textSyles[variant]}>
          {children}
        </Text> 
      );
    }

    return children;
  }, [color, children]);

  return (
    <Pressable
      style={composedStyles}
      ref={forwardedRef}
      {...otherProps}>
      {child}
    </Pressable>
  );
});

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    borderRadius: 5,
  },
  fill: {
    padding: 10,
    paddingVertical: 12,
    backgroundColor: colors.neutral[800],
  },
  outline: {
    padding: 10,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.neutral[800]
  },
  none: {
    width: "auto"
  }
});

const textSyles = StyleSheet.create({
  fill: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.neutral[100]
  },
  outline: {
    fontWeight: "500",
    textAlign: "center",
    color: colors.neutral[800]
  },
  none: {}
});

const fill = StyleSheet.compose(styles.base, styles.fill);
const outline = StyleSheet.compose(styles.base, styles.outline);
const none = styles.base;

export default Button;