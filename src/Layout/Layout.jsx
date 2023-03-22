import React from 'react'
import Footer from '../containers/Footer'
import Header from '../containers/Header'

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <div className='h-[85vh] flex items-center justify-center'>
        {children}
        </div>
        <Footer/>
    </>
  )
}

export default Layout