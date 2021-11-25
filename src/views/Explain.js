import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Box, Center, Text, Button, Image, Container } from 'native-base';
import Swiper from 'react-native-swiper/src';

const { width, height } = Dimensions.get('screen');

const Explain = ({ navigation }) => {
  return (
    <Center flex={1} safeArea>
      <Swiper>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/step1.jpg')}
            width="100%"
            resizeMode="contain"
            alt="step1"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/step2.jpg')}
            width="100%"
            resizeMode="contain"
            alt="step2"
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/step3.jpg')}
            width="100%"
            resizeMode="contain"
            alt="step3"
          />
        </View>
      </Swiper>
      <Button onPress={() => navigation.navigate('Detect')}>
        Go to Detection
      </Button>
    </Center>
  );
};

export default Explain;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
