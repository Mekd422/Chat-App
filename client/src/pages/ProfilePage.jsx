import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import toast from "react-hot-toast";

export const ProfilePage = () => {

  const {authuser, updateprofile} = useContext(AuthContext);
  const [selectedimg, setselectedimg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authuser?.fullName || '');
  const [bio, setBio] = useState(authuser?.bio || '');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if(!selectedimg){
      await updateprofile({fullName: name, bio});
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64image = reader.result;
      await updateprofile({profilePic: base64image, fullName: name, bio});
      navigate('/');
    };
    reader.readAsDataURL(selectedimg);
  } catch (error) {
    toast.error(error.message);
  }
}


  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center
    justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center
      justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1' action="">
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setselectedimg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon} alt="" className={`w-12 h-12${selectedimg &&
              'rounded-full'
            }`} /> Upload profile image
          </label>

          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='Your name' className='
          p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
          focus:ring-violet-500' />

          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
          focus:ring-violet-500' rows={4}></textarea>
          <button className='bg-gradient-to-r from-purple-400
          to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer' type='submit'>Save</button>
        </form>
        <img  className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10
         ${selectedimg &&
              'rounded-full'
            }` }src={ authuser?.profilepic || assets.logo_icon} alt="" />
      </div>

    </div>
  )
}


