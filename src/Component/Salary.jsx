import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper';
import ModalSalary from './ModalSalary';

const Salary = () => {
  const [dataSalary, setDataSalart]=useState([]);
  const [dataLength, setDataLength]=useState(0)
  const [ openModal, setOpenModal] = useState(false)
  const  [fetchStatus, setFetchStatus] = useState(true)
  const [page,setPage]=useState(1)

  const getDataSalary = async () =>{
    try {
    let token = localStorage.getItem('sshrd')
    let res = await axios.get(API_URL+`/sallarys/paging/${page}/10`,{
      headers :{
        'Authorization': `Bearer ${token}`
      }
    })
    setDataLength(res.data.data.total)
    setDataSalart(res.data.data.results)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    getDataSalary()
    setFetchStatus(false)
  },[fetchStatus]);


  const printDataSalary = ()=>{
    return dataSalary.map((val,idx)=>{
        return(
          <tr key={val._id}>
            <td>{val.employee_id.name}</td>
            <td>{ val.employee_id.position_id.name !== undefined && val.employee_id.position_id.name}</td>
            <td>RP. {val.basic_sallary.toLocaleString('id')}</td>
            <td>{val.payday.split('T')[0]}</td>
            <td>{val.notes}</td>
            <td className='flex gap-5 w-56'>
                <button className='btn-success px-2 py-1'>Edit</button>
                <button className='btn-error px-2 py-1'>Delete</button>
              </td>
          </tr>
        )
    });
  };

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
              <th>Position</th>
              <th className=''>Sallary</th>
              <th className=''>Date</th>
              <th className=''>Note</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            {printDataSalary()}
          </tbody>
        </table>
      </div>
      <div>
        {printTooglePage()}
      </div>
      {openModal && <ModalSalary setOpenModal={setOpenModal} setFetchStatus={setFetchStatus}/>}
    </div>
  )
}

export default Salary