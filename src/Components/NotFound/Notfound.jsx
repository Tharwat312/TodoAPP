import React from 'react'
import notFound from '../../assets/notfounddark.png'
const Notfound = () => {
  return (
    <div className='text-center'>
      <img src={notFound} className='w-1/3 mx-auto' />
      <p className='text-gray-200 p-3 text-2xl'>No Notes Found</p>
    </div>
  )
}

export default Notfound