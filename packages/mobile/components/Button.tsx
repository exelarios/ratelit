import React, { useMemo, useState } from "react";
import {
  PressableProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import Text from "@/mobile/components/Text";
import colors from "@/mobile/design/colors";
import composeStyles from "@/mobile/utils/composeStyles";

interface ButtonProps extends PressableProps {
  icon?: any;
  textSize?: number;
  iconAligin?: "start" | "end";
  color?: string;
  variant?: "fill" | "outline" | "none";
  fontWeight?: string;
}

const Button = React.forwardRef<Pressable, ButtonProps>((props, forwardedRef) => {
  const { 
    variant = "none",
    textSize = 15, 
    icon, 
    iconAligin = "start", 
    color, 
    style,
    fontWeight = "normal",
    children,
    onPress,
    ...otherProps 
  } = props;

  const [hovering, setHovering] = useState(false);

  const fill = useMemo(() => {
    return composeStyles(styles.base, styles.fill, style);
  }, [hovering, onPress]);

  const outline = useMemo(() => {
    return composeStyles(styles.base, styles.outline, style);
  }, [hovering, onPress]);

  const none = useMemo(() => {
    return composeStyles(styles.none, style);
  }, [hovering, onPress]);

  const selection = useMemo(() => {
    return {
      fill,
      outline,
      none
    }
  }, [fill, outline, none]);

  if (!selection[variant]) {
    throw new Error("The variant doesn't exist.");
  }

  const currentVarient = selection[variant];

  const composedStyles = composeStyles(
    currentVarient,
    icon != undefined && styles.icon,
    iconAligin === "end" && { flexDirection: "row-reverse" }, 
    style as StyleProp<ViewStyle>
  );

  const composedTextStyles = composeStyles(textSyles[variant], { fontSize: textSize, fontWeight: fontWeight });

  const isText = !React.isValidElement(children) && typeof children === "string";

  const child = useMemo(() => {
    if (isText) {
      const color = textSyles[variant].color;

      return (
        <Text
          color={color}
          style={composedTextStyles}>
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
      onPress={onPress}
      {...otherProps}>
      {icon}
      {child}
    </Pressable>
  );
});

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    padding: 10,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
    minHeight: 50,
    alignItems: "center",
    borderRadius: 5
  },
  fill: {
    backgroundColor: colors.neutral[800],
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.neutral[800],
  },
  none: {
    width: "auto"
  },
  hovering: {
    backgroundColor: colors.neutral[700]
  },
  icon: {
    display: "flex",
    columnGap: 8,
    flexDirection: "row",
    alignItems: "center" 
  }
});

const textSyles = StyleSheet.create({
  fill: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.neutral[50]
  },
  outline: {
    fontWeight: "500",
    textAlign: "center",
    color: colors.neutral[800]
  },
  none: {
    color: colors.neutral[800]
  }
});

export default Button;
