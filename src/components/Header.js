import React from 'react'
import { PropTypes } from 'prop-types'
import { Button } from './Button'
import { useLocation} from 'react-router-dom'


const Header = ({title ,onClick,text,color}) => {


  const location = useLocation()

  return (
  <header className='header'>
    <h1>{title}</h1>
    {
      location.pathname ==='/'?<Button 
      color={color}
      Text={text}
      onClick={onClick}
       />:""
    }



    
    
    
  </header>
  )
}


Header.defaultProps ={
    title:"TaskTracker"
}
Header.propTypes ={
    title : PropTypes.string
}




export default Header