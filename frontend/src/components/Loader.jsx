import React from 'react'
import '../css/Register.css'
import { BallTriangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <div className='loader1'>
                        <BallTriangle visible={true}
                            width="200"
                            color="#F1CBB0"
                            ariaLabel="infinity-spin-loading"></BallTriangle>                        </div>
    </>
  )
}

export default Loader