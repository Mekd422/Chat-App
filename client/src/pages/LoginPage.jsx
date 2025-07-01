import React, { useState } from 'react'
import assets from '../assets/assets'

export const LoginPage = () => {

  const [currentState, setcurrentState] = useState("Sign Up");
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bio, setbio] = useState("");
  const [isdatasubmitted, setisdatasubmitted] = useState(false);


  const onsubmithandler = (event)=>{
    event.preventDefault();

    if(currentState === "Sign Up" && !isdatasubmitted){
      setisdatasubmitted(true)
      return;
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center 
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} className='w-[min(30vw, 250px)]' alt="" />
      {/* right */}

      <form onSubmit={onsubmithandler} action="" className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col
      gap-6 rounded-lg shadow-lg'>
        <h2 className=' font-medium text-2xl flex justify-between items-center
        '>{currentState}

        {isdatasubmitted && <img onClick={()=> setisdatasubmitted(false)} src={assets.arrow_icon} className='w-5 cursor-pointer' alt="" /> }
        
        </h2>

        {currentState === "Sign Up"  && !isdatasubmitted &&(
          <input onChange={(e)=>setfullname(e.target.value)} value={fullname} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none'
        placeholder='full name' required />
        )}

        {
          !isdatasubmitted && (
            <>
            <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='email address' required  className='
            p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500'/>

            <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='password' required  className='
            p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500'/>
            </>
          )
        }

        {
          currentState === "Sign Up" && isdatasubmitted &&(
            <textarea onChange={(e)=>setbio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required></textarea>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 *:to-violet-600 text-white rounded-md cursor-pointer'>
          {currentState === "Sign Up" ? "Create Account": "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currentState === "Sign Up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setcurrentState("Login"); setisdatasubmitted(false)}}
            className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account <span onClick={()=> setcurrentState("Sign Up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span>
            </p>
          )}
        </div>
        
      </form>

    </div>
  )
}
