import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, Button ,FlatList,TextInput,TouchableOpacity,Image} from 'react-native';
import styles from '../stylesheets/styles'
import {CustomButtonStyle} from '../components/ButtonFunc'
import * as StorageHelpers from '../helpers/StorageHelpers'
import {useMappedState,useDispatch} from 'redux-react-hook'
import { changeName } from '../redux/action';

export default function SettingScreen(props) {
    
    
    const [booksCount ,setBooksCount]=useState(0)
    const [booksAddList,setBooksAddList]=useState([])
    
    //Storage為非同步資料，渲染時透過TouchableOpacity觸發，透過addListener監聽是否有被勾取
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadStorage()
        })
        return unsubscribe

    }, [booksCount])

   const loadStorage = async () => {
        let bookGet = await StorageHelpers.getMySetting('myAddBookList')

        // 法ㄧ:先將要顯示的資料處理後再顯示
        // let a = JSON.parse(bookGet)
        // let newArray = []
        // a.forEach((thing) => {
        //     newArray.push(thing.animal_colour + '的' + thing.animal_kind)
        // });

        // setMyBookCount(a.length)
        // setMyBookListName(newArray)

        // 法二：獲取的資料先儲存， 渲染的時候再資料處理
        let a = JSON.parse(bookGet)
        setBooksCount(a.length)
        setBooksAddList(a)

    }
    //主頁完到子頁，資料傳遞函式
    function showNoticeDetail(cases){
        return(
            props.navigation.push('SettingDetailScreen',{infoAddLists:cases})
        )
    }

 //排版渲染
   const renderInfo = (cases) => {
        return (
            <View>
                <TouchableOpacity onPress={() => showNoticeDetail(cases)} >
                    <View>
                        <View style={styles.MainView}>
                            {/* <TouchableOpacity onPress={()=>pressRow(cases)}>
                               { cases.addToList === true ? <Image source={require('../../assets/square_check.png')} style={styles.imageCheck}/> : <Image source={require('../../assets/square_non_check.png')} style={styles.imageCheck}/>}
                            </TouchableOpacity> */}

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
        // 一般渲染
        // <View style={styles.container}>
        //     {/* Go Screen Detail */}
        //     {/* <CustomButtonStyle onPress={()=>props.navigation.push('SettingDetailScreen')} title='GO Screen Detail'/> */}

        //     {/* 法一渲染 */}
        //         {
        //             // booksAddList.map((book, index) => {
        //             //     return (<Text key={index}>領取的書本：{book}</Text>)

        //             // })
        //         }
        //     {/* 法二渲染 */}
        //         {
        //             booksAddList.map((book, index) => {
        //                 return (<Text key={index}>領取的書本：{book.volumeInfo.title}</Text>)
        //             })
        //     }
        // </View>

       <View >
            <FlatList
            data={booksAddList}
            renderItem={cases => renderInfo(cases.item)} 
            keyExtracto={cases => cases.id}
            style={{ backgroundColor: 'white' }}
        />          
        </View>
    );
}
