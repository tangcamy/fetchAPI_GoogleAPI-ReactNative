import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, Button ,FlatList,TouchableOpacity,Image} from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'
import AnimatedCursor from "react-animated-cursor"

import { TouchableWithoutFeedback } from 'react-native'
import * as StorageHelper from '../helpers/StorageHelpers'

var MOCKED_DATA = [
    {
        id: '1',
        imageUrl:require('../image/icons8-cat-50.png'),
        imageSave:require('../image/1-1_save.jpg'),
        note: '提醒：貓咪肚子餓了！',
        date: '2020/01/28 14:00'
    },
    {
        id: '2',
        imageUrl:require('../image/icons8-location-50.png'),
        imageSave:require('../image/1-2_save.jpg'),
        note: '提醒：貓咪抵達飼料區！',
        date: '2020/02/02 12:00'
    },
    {
        id: '3',
        imageUrl:require('../image/icons8-cat-50.png'),
        imageSave:require('../image/1-3_save.jpg'),
        note: '恭喜你：貓咪已經吃飽在剃牙了',
        date: '2020/02/17'
    },
    {
        id: '4',
        imageUrl:require('../image/icons8-location-50.png'),
        imageSave:require('../image/1-4_save.jpg'),
        note: '提醒：貓咪已經離開飼料區',
        date: '2020/03/28 14:00'
    }
]

export default function HomeScreen(props) {
    //資料更新
    const [dataSource, setDataSource]=useState([])

    //arrow function: For MOCKED_DATA Test
    // useEffect(()=>{
    //     var dataRowSource = MOCKED_DATA
    //     setDataSource(dataRowSource)
    // })


    //API資料更新
    useEffect(()=>{
        fetchData()
    },[])
    
    // 講有打勾的addToList資料，更新至Setting主頁
    useEffect(()=>{
        let getAllAddList = []
        dataSource.map(a=>{
            if (a.addToList === true){
                getAllAddList.push(a)
            }
        })
        saveToStorage(getAllAddList)

    })
    
    //因儲存到Storage為非同步資料需使用 async / await
    const saveToStorage = async (getAddBookList) => {
        try {
            await StorageHelper.setMySetting('myAddBookList', JSON.stringify(getAddBookList))
        } catch (err) {
            console.log(err)
        }

    }

    //主頁完到子頁，資料傳遞函式
    function showNoticeDetail(cases){
        return(
            props.navigation.push('HomeDetailScreen',{infoData:cases})
        )
    }

    const fetchData = ()=>{
        const REQUEST_API='https://www.googleapis.com/books/v1/volumes?q={filter:free-ebooks}'
        
        fetch(REQUEST_API)
            .then((response)=>response.json())
            .then((responseData)=>{
                setDataSource(responseData.items)
            })
            .catch((err)=>{
                console.log('Error是',err)
            })

    }
    function pressRow(cases){
        const newDatas = dataSource.map(data=>{
            //先將資料一筆筆讀出來，儲存至新的變數中
            let copyA = {...data}
            //比對欄位key值，並將結果儲存至新增欄位的key
            if (copyA.id === cases.id){
                //如果原本是true變false,false變true
                copyA.addToList =! copyA.addToList 
            }
            //copyA.addToList更新至copyA
            return copyA
        })
        //最後useState更新
        setDataSource(newDatas)
    }

    //排版渲染
   const renderInfo = (cases) => {
        return (
            <View>
                <TouchableOpacity onPress={() => showNoticeDetail(cases)} >
                    
                    <View>
                        <View style={styles.MainView}>
                            <TouchableOpacity onPress={()=>pressRow(cases)}>
                               { cases.addToList === true ? <Image source={require('../../assets/square_check.png')} style={styles.imageCheck}/> : <Image source={require('../../assets/square_non_check.png')} style={styles.imageCheck}/>}
                            </TouchableOpacity>

                            <Image 
                            source={{uri:cases.volumeInfo.imageLinks.smallThumbnail}} style={styles.imageIcon}/>  

                            <View style={{ flex: 1 ,flexDirection:'column'}}>
                                <Text ellipsizeMode='tail' numberOfLines={4} style={[styles.textType,{ color: 'black', fontSize: 17,margin:0}]}>
                                    {cases.volumeInfo.title}
                                </Text>

                                <Text ellipsizeMode='tail' numberOfLines={4} style={[styles.textType,{  color: cases.volumeInfo.authors ? 'gray' : 'red', fontSize: 14,marginTop:2}]}>
                                    {cases.volumeInfo.authors ? cases.volumeInfo.authors : '< 資料沒有標注作者 >'}
                                </Text>
                               <Text ellipsizeMode='tail' numberOfLines={4} style={[styles.textType,{ color: cases.volumeInfo.publishedDate ? 'gray' : 'red', fontSize: 14,marginTop:2}]}>
                                    {cases.volumeInfo.publishedDate ? '出版日期:'+cases.volumeInfo.publishedDate : '< 資料沒有標註出版日期 >'}
                                </Text>
                            </View>

                            <Image source={require('../image/ic_arrow_right.png')} style={styles.imageArrow} />

                        </View>
                        <View style={styles.deliverLine} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View >
            <FlatList
            data={dataSource}
            renderItem={cases => renderInfo(cases.item)} 
            keyExtracto={cases => cases.id}
            style={{ backgroundColor: 'white' }}
        />          
        </View>
    );
}
