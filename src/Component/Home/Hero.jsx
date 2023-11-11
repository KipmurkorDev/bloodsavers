import React from 'react'

const Hero = () => {
  return (
    <div className="bg-cover bg-center h-screen bg-hero rounded-2xl my-10 mx-8 text-white">
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className=" text-6xl text-center font-extrabold mb-4">
          Donate blood, Save lives
        </h1>
        <p className="text-lg mb-8 font-medium ">
          Your blood donation can give a precious smile to someone's face. Join our community of donors today.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-white text-rose-500 rounded-lg transition hover:duration-500 ease-in-out hover:bg-rose-500 hover:text-white">
            Donate Now
          </button>
          <button className="px-6 py-3 bg-transparent text-white rounded-lg border border-white transition hover:duration-500 ease-in-out hover:bg-white hover:text-rose-500">
            Seek blood
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
