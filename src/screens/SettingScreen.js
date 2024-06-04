import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, Button ,TextInput} from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'
import * as StorageHelpers from '../helpers/StorageHelpers'
import {useMappedState,useDispatch} from 'redux-react-hook'
import { changeName } from '../redux/action';

export default function SettingScreen(props) {
    
    const [name,setName] =useState('')

    // ---- redux ----//
    const myNewName = useMappedState(state=>state.newName)
    const disPatch = useDispatch()

    // ---storage ---//
    // //[]才能使textinput修改
    // useEffect( ()=> {
    //     loadStorage()
    // },[])
    // //非同步等待
    // const loadStorage =async()=>{
    //     let nameGet = await StorageHelpers.getMySetting('name')
    //     if (nameGet){ //nameGet !== null
    //         setName(nameGet)
    //     }
    // }
    // //name非同步 等待
    // const changeName = async()=>{
    //     try{
    //      await StorageHelpers.setMySetting('name',name)
    //     }catch(err){
    //         console.error(err)
    //     }  
    // }


    return (
        <View style={styles.container}>
            <Text style={styles.textType}>ProfileScreen</Text>

            <CustomButtonStyle onPress={()=>props.navigation.push('SettingDetailScreen')} title='GO Screen DT'/>

            <TextInput
             maxLength={10}
             style={styles.textInType}
             onChangeText={(text)=>setName(text)}
             value={name}
            />
            
            {/* storage  */}
            {/* <Text>Hello : {name} !</Text>
            <CustomButtonStyle onPress={()=>changeName()}  title='Change Name Storage'/> */}

            {/* redux */}
            <Text>redux framework :{myNewName}</Text>
            <CustomButtonStyle onPress={()=> disPatch(changeName(name))}  title='Redux'/>

        </View>
    );
}
