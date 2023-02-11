import axios from 'axios'
import React, { useState } from 'react'
import { RxCross1} from 'react-icons/rx'
import { API_URL } from '../helper'

const ModalInput = ({setOpenModal,setFetchStatus}) => {
    const [code,setCode]= useState('')
    const [name,setName]= useState('')

    const onSubmit = ()=>{
        let token = localStorage.getItem('sshrd')
        axios.post(API_URL+'/positions/create',{
            code:code,
            name:name
        },
        {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }
        )
        .then((res)=>{
            setCode('')
            setName('')
            setOpenModal(false)
            setFetchStatus(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    };



  return (
    <div className="fixed md:inset-x-[440px] inset-y-2 z-50 ">
    <div className='h-[440px] w-96 shadow-lg rounded-lg bg-white'>
        <div className='h-[70px] border-b-2 border-slate-300 px-10'>
            <div className='pt-5 flex justify-between'>
                <p className='text-xl font-bold'>Add Position</p>
                <RxCross1 size={20} onClick={()=>setOpenModal(false)} className='mt-2'/>
            </div>
        </div>
        <div className='h-[268px] border-b-2 border-slate-300 px-10 py-5'>
            <p className='font-bold' >Code</p>
            <input className='h-[52px] border border-slate-300 my-2' onChange={(e)=>setCode(e.target.value)} type='number'  placeholder='add code'/>
            <p className='font-bold'>Name</p>
            <input className='h-[52px] border border-slate-300 my-2' onChange={(e)=>setName(e.target.value)} placeholder='add name'/>

        </div>
        <div className='flex justify-end px-10'>
            <button className='bg-[#16ABF8] py-2 px-4 rounded-3xl mt-4 text-white font-bold' onClick={onSubmit}>Create</button>
        </div>
    </div>
</div>
  )
}

export default ModalInput