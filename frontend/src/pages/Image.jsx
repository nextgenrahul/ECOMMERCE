import React from 'react'
import { assets } from '../assets/images/assets'

const Image = () => {
  return (
    <div>
        <img className='w-full h-full' src={assets.banner} alt="Not shown" />
        
    </div>
  )
}

export default Image