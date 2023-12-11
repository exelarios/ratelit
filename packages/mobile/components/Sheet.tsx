import { StyleSheet, ViewProps } from "react-native";
import View from "@/mobile/components/View";
import colors from "@/mobile/design/colors";
import FullWindowOverflow from "./FullWindowOverlay";

interface SheetProps extends ViewProps {
  open?: boolean;
  onClose?: () => void;
}

function Sheet(props: SheetProps) {
  const { open = false, onClose, style, children, ...otherProps } = props;

  return open && (
    <FullWindowOverflow style={styles.wrapper} {...otherProps}>
      <View style={styles.container}>
        <View style={styles.bar}></View>
        {children}
      </View>
    </FullWindowOverflow>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  bar: {
    width: 100,
    height: 3,
    backgroundColor: colors.neutral[500]
  },
  container: {
    position: "absolute",
    backgroundColor: colors.neutral[100],
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default Sheet;
