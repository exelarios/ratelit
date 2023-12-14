import { useCallback, useMemo, useRef } from "react";
import { useWindowDimensions, StyleSheet, TouchableWithoutFeedback, ViewProps, GestureResponderEvent, LayoutChangeEvent } from "react-native";
import View from "@/mobile/components/View";
import colors from "@/mobile/design/colors";
import FullWindowOverflow from "@/mobile/components/FullWindowOverlay";
import Animated, { Easing, FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

interface SheetProps extends ViewProps {
  snapPoints: string[],
  open?: boolean;
  onClose?: () => void;
}

function Sheet(props: SheetProps) {
  const { open = false, snapPoints, onClose, style, children, ...otherProps } = props;

  const height = useSharedValue(250);
  const currentSnapPointIndex = useSharedValue(0);

  const containerLayout = useRef({
    width: 0,
    height: 0
  });

  const wrapperLayout = useRef({
    width: 0,
    height: 0
  });

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

  // fix: element from unmounting before exit animations stop playing.
  // fix: sheet doesn't seem to snap to points

  const handleOnGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { startY: number }) => {
      context.startY = height.value;
    },
    onActive: (event, context) => {
      "worklet";
      height.value = context.startY - event.translationY;
    },
    onFinish: (event) => {
      "worklet";
      const maxHeight = dimensions.height - 100;

      // Bound the sheet to the max height.
      if (height.value > maxHeight) {
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        currentSnapPointIndex.value = snaps.length - 1;
        return;
      }

      // Max threshold: [-3000, 3000]
      // Takes the max height of the sheet via swipe up
      // Closes the sheet via swipw down
      if (event.velocityY > 3000) { // swipe down
        runOnJS(onClose)();
        height.value = snaps[1].start
        currentSnapPointIndex.value = 0;
        return;
      }
      
      if (event.velocityY <= -3000) { // swipe up
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        currentSnapPointIndex.value = snaps.length - 1;
        return;
      }

      // Theshold: [-300, 300]
      // Snaps to the next snap point
      if (event.velocityY > 300) { // down
        const index = currentSnapPointIndex.value - 1;
        if (index < 0) return;

        height.value = withTiming(snaps[index].start, {
          duration: 100,
          easing: Easing.ease
        });

        currentSnapPointIndex.value = index;
        return;
      }

      if (event.velocityY <= -300) { // up
        const index = currentSnapPointIndex.value + 1;
        if (index >= snaps.length) return;

        height.value = withTiming(snaps[index].start, {
          duration: 100,
          easing: Easing.ease
        });

        currentSnapPointIndex.value = index;
        return;
      }

      for (let i = 0; i < snaps.length; i++) {
        const snap = snaps[i];
        const { start, end } = snap;
        if (start >= height.value && height.value < end) {
          height.value = withTiming(start, {
            duration: 100,
            easing: Easing.ease
          });
          currentSnapPointIndex.value = i;
          break;
        }
      }
    }
  }, [height, snaps, dimensions, currentSnapPointIndex]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value
    }
  });

  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    const target = event.nativeEvent;
    const cursor = {
      x: target.pageX,
      y: target.pageY
    }

    const wrapper = wrapperLayout.current;
    const container = containerLayout.current;

    const pressableHeight = wrapper.height - container.height;
    const pressableWidth = wrapper.width - container.width;
    if (cursor.y < pressableHeight || cursor.x < pressableWidth) {
      onClose();
    }
  }, [height]);

  const handleOnWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    wrapperLayout.current = {
      width: layout.width,
      height: layout.height
    }
  }, [height]);

  const handleOnContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    containerLayout.current = {
      width: layout.width,
      height: layout.height
    }
  }, [height]);

  return open && (
    <TouchableWithoutFeedback
      onPressIn={handleOnPress}
      onLayout={handleOnWrapperLayout}>
      <FullWindowOverflow>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.wrapper}
          {...otherProps}>
            <PanGestureHandler onGestureEvent={handleOnGestureEvent}>
              <Animated.View
                style={[styles.container, animatedStyles]}
                onLayout={handleOnContainerLayout}
                entering={SlideInDown}
                exiting={SlideOutDown}>
                <View style={styles.bar}>
                  <View style={styles.barInner}></View>
                </View>
                {children}
              </Animated.View>
            </PanGestureHandler>
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
