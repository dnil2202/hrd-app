import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper';
import ModalEmployee from './ModalEmployee';

const Employee = () => {
  const [dataEmployee, setDataEmployee]=useState([])
  const [ openModal, setOpenModal] = useState(false)
  const [dataLength, setDataLength]=useState(0)
  const  [fetchStatus, setFetchStatus] = useState(true)
  const [page,setPage]=useState(1)


  const getDataEmployee = async () =>{
    try {
    let token = localStorage.getItem('sshrd')
    let res = await axios.get(API_URL+`/employees/paging/${page}/10`,{
      headers :{
        'Authorization': `Bearer ${token}`
      }
    });
    if(res){
      setDataLength(res.data.data.total)
      setDataEmployee(res.data.data.results)
    }
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(()=>{
    getDataEmployee()
    setFetchStatus(false)
  },[fetchStatus]);

  const togglePage = (num) =>{
    setFetchStatus(true)
    setPage(num)
  };

  const printTooglePage = () =>{
    let pageLength =Math.ceil(dataLength/10)
    let arrayPage = [...Array(pageLength).keys()]
    return arrayPage.map((v,i)=>{
      return (
        <div className='btn-group' key={i}>
          <div className={`btn ${page === v+1 && 'btn-active'}`} onClick={()=>togglePage(v+1)}>{v+1}</div>
        </div>
      ) 
    })
  };

  const printDataEmployee = ()=>{
    return dataEmployee.map((val,idx)=>{
      return(
        <tr key={val._id}>
          <td>{val.name}</td>
          <td>{val.nik}</td>
          <td>{val.address}</td>
          <td>{val.phone}</td>
          <td>{val.email}</td>
          <td>{val.position_id !== undefined && val.position_id.name}</td>
          <td className='flex gap-5 w-56'>
              <button className='btn-success px-2 py-1'>Edit</button>
              <button className='btn-error px-2 py-1'>Delete</button>
            </td>
        </tr>
      )
    });
  };

  return (
    <div className='px-2 mt-2'>
      <div className='mb-2'>
        <button className='btn-primary py-1 px-2 rounded-lg' onClick={()=>setOpenModal(true)}>Create</button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table table-compact w-full'>
          <thead className=''>
            <tr className=''>
              <th className=''>Name</th>
              <th>Nik</th>
              <th className=''>Addess</th>
              <th className=''>Phone</th>
              <th className=''>Email</th>
              <th className=''>Position</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            {printDataEmployee()}
          </tbody>
        </table>
      </div>
      <div>
        {printTooglePage()}
      </div>
      {openModal && <ModalEmployee setOpenModal={setOpenModal} setFetchStatus={setFetchStatus}/>}
    </div>
  )
}

export default Employee