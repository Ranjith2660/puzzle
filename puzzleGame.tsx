import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';

SystemNavigationBar.navigationHide();

const PuzzleGame = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <LinearGradient colors={['#220A46', '#170636', '#03000A']} style={styles.linearGradient}>
        {/* <LinearTextGradient
          locations={[0, 1]}
          colors={["#57C2EC", "#9AF4FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        > */}
          <Text style={styles.FDT}>FIND DATE & TIME</Text>
        {/* </LinearTextGradient> */}
        <Text style={styles.DETECTIVE}>DETECTIVE</Text>
        <Text style={styles.Task}>Find the date and time & you’re ready to go for the party</Text>
        <TouchableOpacity>
          <Image source={require('../assets/button1.png')} style={styles.button} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  FDT: {
    fontSize: hp('5%'),
    textAlign: 'center',
    marginTop: hp('10%'),
  },
  DETECTIVE: {
    fontSize: hp('7%'),
    color: 'white',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  Task: {
    fontSize: hp('4%'),
    color: 'white',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  button: {
    width: wp('50%'),
    height: hp('10%'),
    alignSelf: 'center',
    marginBottom: hp('15%'),
  },
});

export default PuzzleGame;