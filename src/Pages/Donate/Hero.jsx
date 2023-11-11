import React from 'react'
import donateImg from '../../assets/donate.png'

const Hero = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${donateImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  return (
    <>
    <div className='relative h-screen text-white' style={backgroundImageStyle}>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className=" text-6xl text-center font-extrabold mb-4">
          Donate to BloodSavers
        </h1>
      </div>
    </div>
    <div className="absolute left-0 right-0 -bottom-8 bg-white h-[3.7em] w-1/2 mx-auto flex shadow-xl rounded-xl">{' '}</div>
    </>
  )
}

export default Hero
