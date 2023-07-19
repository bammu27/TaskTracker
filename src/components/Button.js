import React from 'react'
import { PropTypes } from 'prop-types'

export const Button = ({color,Text,onClick}) => {
  return (
    <button className='btn' style={{backgroundColor:color}} onClick={onClick}>{Text}</button>
  )
}

Button.defaultProps ={

    color:"steelblue"
}
Button.propTypes ={
    text:PropTypes.string,
    color:PropTypes.string,
    onClick:PropTypes.func
}