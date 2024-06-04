import React from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'

export default function HomeDetailScreen(props) {
    //從主頁的key[name]獲取資料
    const infoGet = props.route.params.infoData || 'Nothing Get'
    return (
        <View style={styles.container}>
            <Text style={styles.textType} >{infoGet.volumeInfo.title}</Text>
            <Text style={{ margin:5}}>{infoGet.volumeInfo.authors}</Text>
            <Text numberOfLines={15}>{infoGet.volumeInfo.description }</Text>
            <Image 
            source={{uri:infoGet.volumeInfo.imageLinks.thumbnail?infoGet.volumeInfo.imageLinks.thumbnail:require('../image/icons8-location-50.png')}} style={styles.imageSave} 
            />  
        </View >
    );
}
