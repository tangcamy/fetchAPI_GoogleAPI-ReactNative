import React from 'react';
import { StyleSheet, Text, View, Button ,Image} from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'

export default function SettingDetailScreen(props) {
    const infoAddList = props.route.params.infoAddLists || 'Nothing Get'


    return (
        <View style={styles.container}>
            {/* <Text>ProfileDetailScreen</Text> */}
            {/* <CustomButtonStyle onPress={()=>props.navigation.pop()} title='Go SettingScreen' /> */}

            <Text style={{margin:5}}>收藏的書名：{infoAddList.volumeInfo.title}</Text>
            <Image 
            source={{uri:infoAddList.volumeInfo.imageLinks.thumbnail?infoAddList.volumeInfo.imageLinks.thumbnail:require('../image/icons8-location-50.png')}} style={styles.imageSave} 
            />  
        </View>
    );
}
