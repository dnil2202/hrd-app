import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import loginImg from '../Asset/login.svg'
import axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [visible,setVisible]=useState('password')

    const showPass = ()=>{
        if(visible === "password"){
        setVisible("text")
    }else if(visible === "text"){
        setVisible("password")
    }
    };


    const onLogin = async () =>{
        try {
            let respone = await axios.post(API_URL+'/auth/login',{
                email:email,
                password:password
            });
            if(respone){
                localStorage.setItem('sshrd',respone.data.data.token)
                navigate('/dashboard')

            };
        } catch (error) {
            console.log(error)
        }
    };

return (
    <div>
        <div className='container mx-auto md:px-32 lg:grid grid-cols-2 pt-5'>
            <div className=' hidden bg-gradient-to-r from-blue-300 to-white py-10 drop-shadow-md lg:block'>
                <img src={loginImg} alt='loginpages'/>
            <div className='text-center text-xl bg-gradient-to-r from-blue-800 to-blue-400 font-serif bg-clip-text text-transparent mt-10'>
                <div>Manage Pekerja</div>
                <div>Untuk Perushaan</div>
            </div>
            </div>
            <div className='bg-white drop-shadow-md'>
                <div className='px-10 py-5 '>
                    <div className='lg:px-10'>
                    <div className='font-bold text-2xl font-Public'>Login</div>
                    <div className='text-sm font-extralight text-gray-400 font-Public'>Don't have account ?
                    <span className='ml-2 underline text-teal-500 hover:text-teal-600 text-sm font-bold font-Public'>Sign Up</span>
                    </div>
                    <div className='flex justify-evenly lg:justify-around pt-4'>
                                    <div className='border border-gray-400 rounded-lg w-32 hover:bg-gray-300 h-12 lg:w-48'>
                                        <button className='py-3 px-2 flex justify-center'>
                                            <FcGoogle size={20}/>
                                            <div className='text-[13px] font-bold '><span className='hidden lg:inline-flex font-Public ml-2'>Sign in with </span> Google</div>
                                        </button>
                                    </div>
                                    <div className='border bg-blue-700 border-blue-700 w-32 hover:bg-blue-900 rounded-lg h-12 lg:w-48 ml-2'>
                                        <div className='py-3 flex justify-center '
                                        >
                                            <BsFacebook className='mr-2 fill-white' size={20}/>
                                            <div className='text-[13px] text-white'><span className='hidden lg:inline-flex font-Public '>Sign in with </span> Facebook</div>
                                        </div>
                                    </div>
                                </div>
                    <form>
                        <label className='block mb-3 my-14'>
                        <span className='block text-sm font-medium text-gray-700 font-Public'>
                            Email/Username
                        </span>
                        <input type='email' className='mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1'onChange={(e)=>setEmail(e.target.value)} />
                        </label>
                        <label className='block'>
                        <span className='block text-sm font-medium text-gray-700 font-Public'>
                            Password
                        </span>
                        <div className='relative'>
                            <input type={visible} onChange={(e)=>setPassword(e.target.value)} className='mt-1 px-3 py-2  bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1'/>
                            {
                            visible === 'password'
                            ?
                            <BsEye onClick={showPass} size={20} className='absolute top-2 right-3' />
                            :
                            <BsEyeSlash onClick={showPass} size={20} className='absolute top-2 right-3' />
                            }
                        </div>
                        </label>
                    </form>
                        <div className='grid grid-cols-2 my-7'>
                        <div className='flex justify-start'>
                            <input type={'checkbox'}/>
                            <div className='ml-3 text-sm font-Public'>Remember me</div>
                        </div>
                        </div>
                        <div className='h-20'>
                        <p className='text-red-600 text-center leading-7'>{''}</p>
                        </div>
                        <button className='text-white rounded-md bg-teal-500 hover:bg-teal-600 w-full py-2 mt-5 font-Public' onClick={onLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default LoginPages