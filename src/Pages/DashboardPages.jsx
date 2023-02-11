import React, { useState } from 'react'
import Sidebar from '../Component/Sidebar'
import Position from '../Component/Position'
import Employee from '../Component/Employee'
import Salary from '../Component/Salary'

const DashboardPages = () => {
  const [pages,setPages]=useState('position')

  const getPages = (pages) =>{
    setPages(pages)
  };

  return (
    <div className='flex sm:gap-10'>
        <Sidebar 
        tooglePage={getPages}
        page={pages}
        />
      <div>
        <div className={`${pages !== 'position' && 'hidden'  }`}>
          <Position/>
        </div>
        <div className={`${pages !== 'salary' && 'hidden'  }`}>
          <Salary/>
        </div>
        <div className={`${pages !== 'employee' && 'hidden'  }`}>
          <Employee/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPages