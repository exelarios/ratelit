import { Platform, StyleSheet } from "react-native";

import FullWindowOverlayNativeComponent from "@/mobile/utils/FullWindowOverlayNativeComponent";
import View, { ViewProps} from "@/mobile/components/View";
import { forwardRef } from "react";
import composeStyles from "../utils/composeStyles";
import Animated from "react-native-reanimated";

interface FullWindowOverflowProps extends ViewProps {
  size?: "full" | "contain";
  children: React.ReactNode;
}

const FullWindowOverlay = forwardRef<FullWindowOverflowProps, FullWindowOverflowProps>((props, forwardedRef) => {
  const { children, size = "full", style, ...otherProps } = props;
  const Component = Platform.OS === "ios" ? FullWindowOverlayNativeComponent : View;

  // had to compose another View component within since 
  // FullWindowOverlayNativeComponent doesn't have the full access of RN's css properties.
  return (
    <Component style={size === "full" ? StyleSheet.absoluteFill : {}}>
      <View ref={forwardedRef} {...otherProps}>
        {children}
      </View>
    </Component>
  );
});

export default Animated.createAnimatedComponent(FullWindowOverlay);