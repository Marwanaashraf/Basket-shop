import React from 'react'

export default function Loading() {
  return (
    <div className='bg-white fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center space-y-14 z-[100] '>
      <span className="loader"></span>
      <p className='text-lg font-semibold'>Please wait...</p>
    </div>
  )
}
