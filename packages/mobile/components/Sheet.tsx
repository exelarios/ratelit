import { useWindowDimensions, StyleSheet, TouchableWithoutFeedback, ViewProps } from "react-native";
import View from "@/mobile/components/View";
import colors from "@/mobile/design/colors";
import FullWindowOverflow from "@/mobile/components/FullWindowOverlay";
import Animated, { Easing, FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useMemo } from "react";

interface SheetProps extends ViewProps {
  snapPoints: string[],
  open?: boolean;
  onClose?: () => void;
}

function Sheet(props: SheetProps) {
  const { open = false, snapPoints, onClose, style, children, ...otherProps } = props;

  const height = useSharedValue(250);
  const dimensions = useWindowDimensions();

  const snaps = useMemo(() => {
    const windowHeight = dimensions.height - 100;
    const partition = Math.floor(windowHeight / snapPoints.length);
    return snapPoints.map((point, index) => {
      const regex = new RegExp(/\d+/);
      let value = parseInt(regex.exec(point)[0]);
      value = value / 100;
      
      if (index == 0) {
        return {
          point,
          start: 0,
          end: partition
        }
      }

      const start = (partition * (index + 1)) - partition;
      const end = partition * (index + 1);

      return {
        point,
        start,
        end
      }
    });
  }, [snapPoints]);

  // todo: fix element from unmounting before exit animations stop playing.

  const handleOnGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { startY: number }) => {
      context.startY = height.value;
    },
    onActive: (event, context) => {
      height.value = context.startY - event.translationY;

      if (height.value < 100) {
        runOnJS(onClose)();
        height.value = 230;
      }
    },
    onFinish: (event, context) => {
      const maxHeight = dimensions.height - 100;
      if (height.value > maxHeight) {
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        return;
      }

      if (event.velocityY > 3000) { // swipe down
        runOnJS(onClose)();
        return;
      }
      
      if (event.velocityY <= -3000) { // swipe up
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        return;
      }

      for (const snap of snaps) {
        const { start, end } = snap;
        if (start >= height.value && height.value < end) {
          height.value = withTiming(start, {
            duration: 100,
            easing: Easing.ease
          });
          break;
        }
      }
    }
  }, [height]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value
    }
  });

  return open && (
    <TouchableWithoutFeedback>
      <FullWindowOverflow>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.wrapper}
          {...otherProps}>
          <TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={handleOnGestureEvent}>
              <Animated.View
                style={[styles.container, animatedStyles]}
                entering={SlideInDown}
                exiting={SlideOutDown}>
                <View style={styles.bar}>
                  <View style={styles.barInner}></View>
                </View>
                {children}
              </Animated.View>
            </PanGestureHandler>
          </TouchableWithoutFeedback>
        </Animated.View>
      </FullWindowOverflow>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  bar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  barInner: {
    width: 100,
    marginHorizontal: "auto",
    height: 4,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral[500]
  },
  container: {
    position: "absolute",
    backgroundColor: colors.neutral[100],
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default Sheet;
