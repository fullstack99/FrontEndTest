import React, { useEffect, useState, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  Center,
  Text,
  Box,
  Alert,
  IconButton,
  CloseIcon,
  HStack,
  VStack,
} from 'native-base';
import { Accelerometer } from 'expo-sensors';

import Progress from '../components/Progress';

const Detect = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [angleHeight] = useState(new Animated.Value(0));

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(15);
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const angle = useMemo(() => {
    const { y, z } = data;
    if (z === 0) return 0;
    const squatAngle = (Math.atan(Math.abs(y / z)) / Math.PI) * 180;
    Animated.timing(angleHeight, {
      toValue: (squatAngle / 100) * 300,
      duration: 100,
      useNativeDriver: false,
    }).start();
    return Math.floor(squatAngle);
  }, [data]);

  useEffect(() => {
    if (angle < 70 || angle > 85) {
      setIsVisible(false);
    }
  }, [angle]);

  return (
    <Center flex={1} safeArea px={3}>
      <Box flex={1}>
        <Text mb={5}>
          Reimplement the interactive angle detection tool that succeeds when
          the phone is between 70-85&deg; for 3 seconds. The countdown animation
          thing is optional, but please provide some indicator that the user is
          doing the right thing.
        </Text>
        <View style={styles.angleWrapper}>
          <View style={styles.angleContainer}>
            <View
              style={[
                styles.angleTargetView,
                angle > 70 && angle < 85 && { backgroundColor: '#28a745' },
              ]}
            />
            <Animated.View style={[styles.angleView, { height: angleHeight }]}>
              <Text pt={1} textAlign="center" bold>
                {angle}°
              </Text>
            </Animated.View>
          </View>
          {angle >= 70 && angle <= 85 && (
            <Progress handleSuccess={() => setIsVisible(true)} />
          )}
        </View>
      </Box>
      {isVisible && (
        <Alert w="100%" colorScheme="success" status="success">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text>Good Angle</Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setIsVisible(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      )}
    </Center>
  );
};

export default Detect;

const styles = StyleSheet.create({
  angleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  angleContainer: {
    width: 40,
    height: 300,
    backgroundColor: '#343a40',
    borderRadius: 20,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 100,
  },
  angleTargetView: {
    position: 'absolute',
    top: 300 - (300 * 85) / 100,
    bottom: (300 * 70) / 100,
    left: 0,
    right: 0,
    backgroundColor: '#ffc107',
    borderRadius: 20,
  },
  angleView: {
    backgroundColor: '#6c757d',
    borderRadius: 20,
  },
});
