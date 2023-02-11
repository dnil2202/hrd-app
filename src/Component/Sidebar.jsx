import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack} from 'react-icons/io';
import { AiOutlineLogout} from 'react-icons/ai';
import { FcSalesPerformance, FcInTransit, FcTemplate, FcClock, FcBriefcase } from 'react-icons/fc'

const Sidebar = ({tooglePage, page}) => {
  const navigate = useNavigate()
  const [open, setOpen]=useState(true)

  const onLogout = () => {
    localStorage.removeItem('sshrd')
    navigate('/')
  };


  return (
    <div>
        <div className='hidden sm:block'>
            <div className={`${open ? "w-60" : "w-20"} p-5 pt-8 h-screen bg-white shadow-lg relative duration-500`}>
                <IoIosArrowBack size={30}
                className={`absolute -right-3 rounded-full cursor-pointer top-9 border-2 duration-300 bg-white  ${!open && "rotate-180"} ring-2 ring-teal-200`}
                onClick={() => setOpen(!open)} />
                <div className='flex gap-x-3 items-center'>
                <span className={`cursor-pointer origin-center bg-gradient-to-r from-green-500 to-blue-600 text-2xl text-transparent font-extrabold bg-clip-text ${!open && "hidden"}`}>HRD-APP</span>
                <button className={`btn-error px-2 py-1 hover:bg-red-500 text-white ${!open && 'hidden'}` } onClick={onLogout}>Logout</button>
                </div>
                <ul className='pt-16 mx-1'>
                <li className={`${page === 'position' ? 'underline' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`}
                    onClick={()=>tooglePage('position')}
                >
                    <FcTemplate size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
                    <span className={`${!open && 'hidden'}`}>Position</span>
                </li>
                <li className={`${page === 'employee' ? 'underline' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
                    onClick={()=>tooglePage('employee')}
                >
                    <FcBriefcase size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
                    <span className={`${!open && 'hidden'}`}>Employee</span>
                </li>
                <li className={`${page === 'salary' ? 'underline' : 'no-underline'} font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-10`}
                    onClick={()=>tooglePage('salary')}
                >
                    <FcSalesPerformance size={30} className={`duration-300 ${open && "rotate-[360deg]"}`} />
                    <span className={`${!open && 'hidden'}`}>Sallary</span>
                </li>
                </ul>
            </div>
        </div>
        <div className='sm:hidden w-10'>
        <div className={`h-screen bg-whiterelative shadow-lg`}>
            <ul className='mx-1'>
                <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`} onClick={()=>tooglePage('position')}>
                    <FcTemplate size={30}  />
                </li>
                <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`} onClick={()=>tooglePage('employee')}>
                    <FcBriefcase size={30}  />
                </li>
                <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`} onClick={()=>tooglePage('salary')}>
                    <FcSalesPerformance size={30}  />
                </li>
                <li className={`font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-slate-300 rounded-md mt-5`} onClick={()=>tooglePage('salary')}>
                    <AiOutlineLogout className='fill-red-500' size={30} onClick={onLogout}  />
                </li>
            </ul>
        </div>
        </div>
  </div>
  )
}

export default Sidebar