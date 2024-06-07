import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2000',
    alignItems: 'center',
    justifyContent: 'top',
    margin:10
  },
  buttonType:{
    backgroundColor:'green',
    borderRadius:30,
    height:35,
    width:220,
  },
  textType:{
  fontSize: 20, 
  color:'tomato',
  margin:5,
  padding:'2px',
},
  MainView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8
  },
  deliverLine: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  imageArrow: {
    width: 20,
    height: 30,
    marginRight:5
  },
  imageIcon:{
    width:60,
    height:60,
    marginRight:10
  },
  imageCheck:{
   width:20,
   height:20,
   marginRight:15
  },
  imageSave:{
    width:200,
    height:275,
    marginRight:5,
    borderRadius:5,
    marginTop:20,
    marginLeft:5
    },
  textInType:{
    height:50,
    width:300,
    backgroundColor:'gray',
    textAlign:'center',
    fontSize: 20, 
    color:'white',
    margin:5,
    padding:'2px'
  }
});
