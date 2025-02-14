import React, { useState, useRef } from "react";
import { 
  Image, 
  ImageBackground, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity 
} from "react-native";
import Orientation from "react-native-orientation-locker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Video from 'react-native-video';
import Slider from "@react-native-community/slider"; 

Orientation.lockToLandscape();
SystemNavigationBar.navigationHide();

const CCTVPlayer = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false); 
  const [videoUrl, setVideoUrl] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const playerRef = useRef(null);

  const playControl = () => {
    playerRef.current?.seek(10);
  }; 

  const pauseControl = () => {
    playerRef.current?.pause();
  };

  const muteControl = () => {
    setIsMuted(prevMuted => !prevMuted);
  };

  const screenControl = () => {
    setIsFullscreen(prevFullscreen => !prevFullscreen);
  };

  const handleImageClick = (videoSource) => {
    setVideoUrl(videoSource); 
    setIsVideoVisible(true); 
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime);
  };

  const handleLoad = (meta) => {
    setDuration(meta.duration);
  };

  const handleSeek = (value) => {
    playerRef.current?.seek(value);
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <ImageBackground resizeMode="stretch" style={styles.backgroundImage} source={require("./assets/bg-1.jpg")}>
        
        {/* Header section */}
        <View style={styles.Header}>
          <Icon name="chevron-left" size={30} color={'white'} />
          <Text style={styles.text}> CCTV</Text>
        </View>

        {isVideoVisible && (
          <View style={styles.videoContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsVideoVisible(false)}>
              <Icon name="close" size={35} color="white" />
            </TouchableOpacity>

            <Video
              ref={playerRef}
              source={{ uri: videoUrl }}                
              style={styles.videoPlayer}
              resizeMode="contain"
              muted={isMuted}
              fullscreen={isFullscreen}
              onProgress={handleProgress}
              onLoad={handleLoad}
              onEnd={() => setIsVideoVisible(false)}  
            />

            <View style={styles.controlSection}>
              <TouchableOpacity onPress={playControl}>
                <Icon name="play-arrow" size={30} color={'rgba(18, 140, 140, 0.8)'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={pauseControl}>
                <Icon name="pause" size={30} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => playerRef.current?.seek()}>
                <Icon name="stop" size={30} />
              </TouchableOpacity>

              {/* Progress Bar and Time Display */} 
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={handleSeek}
                minimumTrackTintColor="rgba(18, 140, 140, 0.8)"
                maximumTrackTintColor="rgba(67, 69, 69, 0.79)"
                thumbTintColor="rgba(18, 140, 140, 0.8)"
              />

                <Text style={styles.timeText}>{formatTime(currentTime)}  /</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
                <TouchableOpacity>
              <Text style={styles.HD}> HD </Text>
              </TouchableOpacity> 
              <TouchableOpacity onPress={muteControl}>
                <Icon name={isMuted ? "volume-off" : "volume-up"} size={30} />
              </TouchableOpacity>

              <TouchableOpacity onPress={screenControl}>
                <Icon name={isFullscreen ? "fullscreen-exit" : "fullscreen"} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* CCTV Section */}
        <View style={styles.cctvSection}>
          <View style={styles.frame}>
            <TouchableOpacity onPress={() => handleImageClick('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}>
              <Image source={require('./assets/cctvftrame.png')} style={styles.frameImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}>
              <Image source={require('./assets/cctvftrame.png')} style={styles.frameImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}>
              <Image source={require('./assets/cctvftrame.png')} style={styles.frameImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}>
              <Image source={require('./assets/cctvftrame.png')} style={styles.frameImage} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'relative',
  },
  Header: {
    width: '100%',
    padding: 8,
    backgroundColor: 'rgba(9, 9, 9, 0.67)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22,
  },
  cctvSection: {
    left: wp('2.5%'),
    width: wp('70%'),
    position: 'absolute',
  },
  frame: {
    top: '18%',
    left: '13%',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    width: '100%',
  },
  frameImage: {
    width: wp('32%'), 
    height: hp('40%'), 
    marginBottom: hp('2%'), 
    resizeMode: 'contain',
    borderWidth: 1,
  },
  videoContainer: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '90%',
    height: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
    elevation: 10,  
  }, 
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 1,
  },
  controlSection: {
    position: 'absolute',
    width: '70.7%',
    height: '20%',
    backgroundColor: 'white',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
 
  slider: {
    flex: 1,
    height: 50,
  },
  timeText: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 5,
  },
  HD: {
    fontSize: 20,
    color: 'rgba(18, 140, 140, 0.8)',
  },
});

export default CCTVPlayer;
