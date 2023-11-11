import React from 'react'

const Hero = () => {
  return (
    <>
    <div className="relative bg-cover bg-center h-screen bg-donate text-white">
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
