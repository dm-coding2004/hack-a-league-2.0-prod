
import React from 'react'
import { TypeAnimation } from 'react-type-animation';




const Hero = () => {
  return (
    <section className='w-full  h-full flex flex-col justify-center min-h-screen gap-10 p-7 
    bg-gradient-to-b from-black to-gray-800 font-mono  text-white '>
        
      <h1 className='text-white font-bold '>
      <TypeAnimation
        sequence={[
          "Hi",
          1000,
          "Create your Own bot",
          1000,
          "I answer",
          1000,
        ]}
        speed={50}
        repeat={Infinity}
        style={{ fontSize: '5em' }}
      />
      </h1>
      <h1 className='text-gray-500 text-2xl '>Create you're own Chatbot</h1>
      <button className='font-bold bg-gradient-to-r from-indigo-500 h-[55px] w-[200px] rounded'>Get started   ...</button>
        
    </section>
  )
}

export default Hero