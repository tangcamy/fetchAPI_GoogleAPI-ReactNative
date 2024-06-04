import React from 'react'
import { TouchableOpacity, Text ,StyleSheet} from 'react-native'
import styles from '../stylesheets/styles'
import PropTypes from 'prop-types'

export function CustomButtonStyle(props){
  return(
    <TouchableOpacity style={props.changeStyle} onPress={props.onPress}>
      <Text style={[styles.textType,{color:props.color,textAlign:'center'}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

CustomButtonStyle.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

CustomButtonStyle.defaultProps = {
  title: 'Hello',
  color: 'white',
  changeStyle:styles.buttonType
}
