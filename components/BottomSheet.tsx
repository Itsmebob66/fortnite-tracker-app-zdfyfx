
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { colors } from '../styles/commonStyles';

interface SimpleBottomSheetProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Snap positions for the bottom sheet
const SNAP_POINTS = {
  HALF: SCREEN_HEIGHT * 0.5,
  FULL: SCREEN_HEIGHT * 0.85,
  CLOSED: SCREEN_HEIGHT,
};

const SimpleBottomSheet: React.FC<SimpleBottomSheetProps> = ({
  children,
  isVisible = false,
  onClose
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const gestureTranslateY = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [currentSnapPoint, setCurrentSnapPoint] = useState(SNAP_POINTS.HALF);
  const lastGestureY = useRef(0);
  const startPositionY = useRef(0);

  console.log('BottomSheet isVisible:', isVisible);

  useEffect(() => {
    if (isVisible) {
      setCurrentSnapPoint(SNAP_POINTS.HALF);
      gestureTranslateY.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT - SNAP_POINTS.HALF,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setCurrentSnapPoint(SNAP_POINTS.CLOSED);
      gestureTranslateY.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, translateY, backdropOpacity]);

  const handleBackdropPress = () => {
    console.log('Backdrop pressed, closing bottom sheet');
    onClose?.();
  };

  const snapToPoint = (point: number) => {
    console.log('Snapping to point:', point);
    setCurrentSnapPoint(point);
    gestureTranslateY.setValue(0);
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT - point,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Determines the closest snap point based on velocity and position
  const getClosestSnapPoint = (currentY: number, velocityY: number) => {
    const currentPosition = SCREEN_HEIGHT - currentY;

    if (velocityY > 1000) return SNAP_POINTS.CLOSED;
    if (velocityY < -1000) return SNAP_POINTS.FULL;

    const distances = [
      { point: SNAP_POINTS.HALF, distance: Math.abs(currentPosition - SNAP_POINTS.HALF) },
      { point: SNAP_POINTS.FULL, distance: Math.abs(currentPosition - SNAP_POINTS.FULL) },
    ];

    if (currentPosition < SNAP_POINTS.HALF * 0.5) {
      return SNAP_POINTS.CLOSED;
    }

    distances.sort((a, b) => a.distance - b.distance);
    return distances[0].point;
  };

  // Handles pan gesture events with boundary clamping
  const onGestureEvent = (event: any) => {
    const { translationY } = event.nativeEvent;
    lastGestureY.current = translationY;

    const currentBasePosition = SCREEN_HEIGHT - currentSnapPoint;
    const intendedPosition = currentBasePosition + translationY;

    const minPosition = SCREEN_HEIGHT - SNAP_POINTS.FULL;
    const maxPosition = SCREEN_HEIGHT;

    const clampedPosition = Math.max(minPosition, Math.min(maxPosition, intendedPosition));
    const clampedTranslation = clampedPosition - currentBasePosition;

    gestureTranslateY.setValue(clampedTranslation);
  };

  // Handles gesture state changes (begin/end) for snapping behavior
  const onHandlerStateChange = (event: any) => {
    const { state, translationY, velocityY } = event.nativeEvent;

    if (state === State.BEGAN) {
      startPositionY.current = SCREEN_HEIGHT - currentSnapPoint;
    } else if (state === State.END) {
      const currentBasePosition = SCREEN_HEIGHT - currentSnapPoint;
      const intendedPosition = currentBasePosition + translationY;

      const minPosition = SCREEN_HEIGHT - SNAP_POINTS.FULL;
      const maxPosition = SCREEN_HEIGHT;

      const finalY = Math.max(minPosition, Math.min(maxPosition, intendedPosition));
      const targetSnapPoint = getClosestSnapPoint(finalY, velocityY);

      gestureTranslateY.setValue(0);

      if (targetSnapPoint === SNAP_POINTS.CLOSED) {
        onClose?.();
      } else {
        snapToPoint(targetSnapPoint);
      }
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]}
          />
        </TouchableWithoutFeedback>

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [
                  { translateY: Animated.add(translateY, gestureTranslateY) }
                ],
              },
            ]}
          >
            <View style={styles.header}>
              <View style={styles.handle} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              {children}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

SimpleBottomSheet.displayName = 'SimpleBottomSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  bottomSheet: {
    height: SNAP_POINTS.FULL,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px -4px 20px rgba(255, 215, 0, 0.1)',
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    flex: 1,
    alignSelf: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  closeButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default SimpleBottomSheet;
