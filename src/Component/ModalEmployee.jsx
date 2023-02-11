import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RxCross1} from 'react-icons/rx'
import { API_URL } from '../helper'

const ModalEmployee = ({setOpenModal,setFetchStatus}) => {

    const [dataPosition, setDataPosition]=useState([])

    const [inputEmployee, setInputeEmployee]= useState({
        nik:'',
        name:'',
        address:'',
        phone: '',
        email: '',
        position_id: ''
    });

    const getDataPosition = async () =>{
        let token =localStorage.getItem('sshrd')
        try {
        let res = await axios.get(API_URL+`/positions`,{
            headers :{
            'Authorization': `Bearer ${token}`
            }
        })
        let data =res.data.data
        let uniqueData = data.filter((item,index,self)=>self.findIndex(t=> t.name === item.name)===index)
        setDataPosition(uniqueData)
        } catch (error) {
        console.log(error)
        }
    };

    useEffect(()=>{
        getDataPosition()
    },[]);
    
    const onChange = (e) => {
        let { value, name } = e.target
        if(name === 'position_id'){
            let data = dataPosition.filter((val,idx)=>value===val.name)
            value = data[0]._id
        }
        setInputeEmployee({ ...inputEmployee, [name]: value })
    }

    const onSubmit = () => {
        let token = localStorage.getItem('sshrd')

        axios.post(API_URL+'/employees/create',{
        nik:inputEmployee.nik,
        name:inputEmployee.name,
        address:inputEmployee.address,
        phone: inputEmployee.phone,
        email: inputEmployee.email,
        position_id: inputEmployee.position_id
        },
        {
            headers :{
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res)=>{
                setFetchStatus(true)
                setOpenModal(false)
                setInputeEmployee({
                    nik:'',
                    name:'',
                    address:'',
                    phone: '',
                    email: '',
                    position_id: ''
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    const printInputPosition = () =>{
        return dataPosition.map((val,idx)=>{
            return(
                <option key={val._id}>{val.name}</option>
            )
        });
    };

    return (
        <div className="fixed inset-y-2 md:inset-x-[440px] z-50">
        <div className='h-[670px] w-96 shadow-lg rounded-lg bg-white'>
            <div className='h-[70px] border-b-2 border-slate-300 px-10'>
                <div className='pt-5 flex justify-between'>
                    <p className='text-xl font-bold'>Add Position</p>
                    <RxCross1 size={20} onClick={()=>setOpenModal(false)} className='mt-2'/>
                </div>
            </div>
            <div className='h-[500px] border-b-2 border-slate-300 px-10 py-5'>
                <p className='font-bold' >Nik</p>
                <input className='w-full border pl-2 rounded-md border-slate-300 my-2'  placeholder='add nik' onChange={onChange} name='nik'/>
                <p className='font-bold'>Name</p>
                <input className='w-full rounded-md pl-2 border border-slate-300 my-2'  placeholder='add name' onChange={onChange} name='name'/>
                <p className='font-bold'>Address</p>
                <input className='w-full rounded-md pl-2 border border-slate-300 my-2'  placeholder='add address' onChange={onChange} name='address'/>
                <p className='font-bold'>Phone</p>
                <input className='w-full rounded-md pl-2 border border-slate-300 my-2'  placeholder='add phone' onChange={onChange} name='phone'/>
                <p className='font-bold'>Email</p>
                <input className='w-full rounded-md pl-2 border border-slate-300 my-2'  placeholder='add email' onChange={onChange} name='email'/>
                <p className='font-bold'>Position</p>
                <select onChange={onChange} name='position_id' className='bg-white border w-full rounded-md my-2'>
                    <option>Select</option>
                    {printInputPosition()}
                </select>
            </div>
            <div className='flex justify-end px-10'>
                <button className='bg-[#16ABF8] py-2 px-4 rounded-3xl mt-4 text-white font-bold' onClick={onSubmit}>Create</button>
            </div>
        </div>
    </div>
    )
}

export default ModalEmployee