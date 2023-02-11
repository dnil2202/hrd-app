import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper';
import ModalInput from './ModalPosition';

const Position = () => {
  const [dataPosition, setDataPosition]=useState([])
  const [dataLength, setDataLength]=useState(0)
  const [ openModal, setOpenModal] = useState(false)
  const  [fetchStatus, setFetchStatus] = useState(true)
  const [page,setPage]=useState(1)

  const getDataPosition = async () =>{
    let token =localStorage.getItem('sshrd')
    try {
      let res = await axios.get(API_URL+`/positions/paging/${page}/10`,{
        headers :{
          'Authorization': `Bearer ${token}`
        }
      })
      setDataLength(res.data.data.total)
      setDataPosition(res.data.data.results)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    if(fetchStatus){
      getDataPosition()
      setFetchStatus(false)
    }
  },[fetchStatus])

  const printDataPosition = () => {
    return dataPosition.map((val,idx)=>{
      return(
          <tr key={val._id}>
            <td className='w-80'>{val.name}</td>
            <td>{val.code}</td>
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
  }


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
          <thead>
            <tr className=''>
              <th className='w-80'>Name</th>
              <th>Code</th>
              <th className='w-56'>Action</th>
            </tr>
          </thead>
          <tbody>
            {printDataPosition()}
          </tbody>
        </table>
      </div>
      <div>
        {printTooglePage()}
      </div>
      {openModal && <ModalInput setOpenModal={setOpenModal} setFetchStatus={setFetchStatus}/>}
    </div>
  )
}

export default Position