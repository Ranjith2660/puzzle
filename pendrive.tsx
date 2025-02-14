// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/FontAwesome'; 

// const fileCategories = [
//     { name: 'Videos', image: require('./assets/videos.png') },
//     { name: 'Document', image: require('./assets/document.png') },
//     { name: 'Picture', image: require('./assets/picture.png') },
//     { name: 'Music', image: require('./assets/music.png') },
//     { name: 'Misc', image: require('./assets/misc.png') },
//     { name: 'Downloads', image: require('./assets/downloads.png') },
//     { name: 'Favorite', image: require('./assets/favorite.png') },
//     { name: 'Random', image: require('./assets/random.png') },
//     { name: 'Add', image: require('./assets/add.png') },
// ];

// const Pendrive = () => {
//     return (
//         <ImageBackground
//             source={require('./assets/bg-without-txt.jpg')}
//             style={styles.backgroundImage}
//             imageStyle={styles.backgroundImageStyle}
//         >
//             {/* Hide Status Bar */}
//             <StatusBar hidden={true} />

//             <View style={styles.container}>
//                 {/* Header Section */}
//                 <View style={styles.header}>
//                     <TouchableOpacity>
//                         <Icon name="chevron-left" size={20} color="white" /> {/* Back button */}
//                     </TouchableOpacity>
//                     <Text style={styles.headerText}>PENDRIVE</Text>
//                 </View>

//                 {/* Storage Container */}
//                 <View style={styles.storageContainer}>
//                     <Image source={require('./assets/storage.png')} style={styles.storageImage} />
//                 </View>

//                 {/* File Categories Grid */}
//                 <View style={styles.fileGrid}>
//                     <Text style={styles.fileHeader}>Your Files</Text>
//                     <FlatList
//                         data={fileCategories}
//                         numColumns={3}
//                         keyExtractor={(item) => item.name}
//                         contentContainerStyle={styles.flatListContainer}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity style={styles.card}>
//                                 <Image source={item.image} style={styles.cardImage} />
//                             </TouchableOpacity>
//                         )}
//                     />
//                 </View>
//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//     },
//     backgroundImageStyle: {
//         resizeMode: 'cover',
//         opacity: 3,  
//     },
//     container: {
//         flex: 1,
//         padding: wp('3%'),
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: hp('1%'),
//         paddingHorizontal: wp('2%'),
//     },
//     headerText: {
//         color: 'white',
//         fontSize: hp('2%'),
//         fontWeight: 'bold',
//         marginLeft: wp('5%'),
//         bottom:wp('0%'),
//     },
//     storageContainer: {
//         padding: wp('2%'),
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     storageImage: {
//         width: wp('90%'),
//         height: wp('60%'),
//         resizeMode: 'contain',
//     },
//     fileGrid: {
//         flex: 1,
//     },
//     fileHeader: {
//         fontSize: hp('3%'),
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     flatListContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//     },
//     card: {
//         flex: 1,
//         width: wp('40%'),
//         height: wp('33%'),
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     cardImage: {
//         width: wp('35%'),
//         height: wp('35%'),
//         borderRadius: 10,
//         resizeMode: 'contain',
//     },
// });

// export default Pendrive;
