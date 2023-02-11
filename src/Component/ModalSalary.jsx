import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RxCross1} from 'react-icons/rx'
import { API_URL } from '../helper'

const ModalSalary = ({setOpenModal,setFetchStatus}) => {

    const [dataEmployee, setDataEmployee]= useState([])

    const [inputSalary,setInputSalary]=useState({
        basic_sallary: 0,
        allowance: 0,
        payday: "",
        notes: "",
        employee_id: ""
    })

    const getDataEmployee = async () =>{
        try {
        let token = localStorage.getItem('sshrd')
        let res = await axios.get(API_URL+`/employees`,{
          headers :{
            'Authorization': `Bearer ${token}`
          }
        });
        if(res){
          setDataEmployee(res.data.data)
        }
        } catch (error) {
          console.log(error)
        }
      };

      useEffect(()=>{
        getDataEmployee()
      },[])

    const onChange = (e) =>{
        let { value, name } = e.target
        if(name === 'employee_id'){
            let data = dataEmployee.filter((val,idx)=>value===val.name)
            value = data[0]._id
        }
        setInputSalary({ ...inputSalary, [name]: value })
    };

    const printInputPosition = () =>{
        return dataEmployee.map((val,idx)=>{
            return(
                <option key={val._id}>{val.name}</option>
            )
        });
    };

    
    const onSubmit = () => {
        let token = localStorage.getItem('sshrd')

        axios.post(API_URL+'/sallarys/create',{
            basic_sallary: inputSalary.basic_sallary,
            allowance: inputSalary.allowance,
            payday: inputSalary.payday,
            notes: inputSalary.notes,
            employee_id: inputSalary.employee_id
        },
        {
            headers :{
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res)=>{
                setFetchStatus(true)
                setOpenModal(false)
                setInputSalary({
                    basic_sallary: 0,
                    allowance: 0,
                    payday: "",
                    notes: "",
                    employee_id: ""
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    };

    return (
        <div className="fixed inset-x-[440px] inset-y-5 ">
        <div className='h-[670px] w-[830px] shadow-lg rounded-lg bg-white'>
            <div className='h-[70px] border-b-2 border-slate-300 px-10'>
                <div className='pt-5 flex justify-between'>
                    <p className='text-xl font-bold'>Add Position</p>
                    <RxCross1 size={20} onClick={()=>setOpenModal(false)} className='mt-2'/>
                </div>
            </div>
            <div className='h-[500px] border-b-2 border-slate-300 px-10 py-5'>
                <p className='font-bold' >Salary</p>
                <input className='h-[40px] w-[759px] border border-slate-300 my-2'  placeholder='add salary' onChange={onChange} name='basic_sallary'/>
                <p className='font-bold'>Allowance</p>
                <input className='h-[40px] w-[759px] border border-slate-300 my-2'  placeholder='add allowance' onChange={onChange} name='allowance'/>
                <p className='font-bold'>Payday</p>
                <input className='h-[40px] w-[759px] border border-slate-300 my-2'  placeholder='add payday' type='date' onChange={onChange} name='payday'/>
                <p className='font-bold'>Notes</p>
                <input className='h-[40px] w-[759px] border border-slate-300 my-2'  placeholder='add notes' onChange={onChange} name='notes'/>
                <p className='font-bold'>Select Employee</p>
                <select onChange={onChange} className='bg-white border h-[40px] my-2' name='employee_id'>
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

export default ModalSalary