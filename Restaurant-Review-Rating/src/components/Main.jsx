import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Main = ({children}) => {
  return (
    <div>
        <Header/>
        {children} {/* children prop'u ile gelen içeriği render ediyoruz */}
        <Footer/>
       
    </div>
  )
}

export default Main