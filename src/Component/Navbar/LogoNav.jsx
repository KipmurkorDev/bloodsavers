import React from 'react'
import Logo from '../../assets/logo.svg'

const LogoNav = () => {
  return (
    <>
        <div className='p-4'>
            <img src={Logo} alt="BloodSaver logo" className="h-[2.7em]"/>
        </div>
    </>
  )
}

export default LogoNav
