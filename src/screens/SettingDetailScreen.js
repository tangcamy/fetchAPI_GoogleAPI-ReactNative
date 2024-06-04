import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'

export default function SettingDetailScreen(props) {
    
    return (
        <View style={styles.container}>
            <Text>ProfileDetailScreen</Text>
            <CustomButtonStyle onPress={()=>props.navigation.pop()} title='Go SettingScreen' />
            <Text style={{color:'red'}}>此專案用Storage概念</Text>
        </View>
    );
}
