import React, { useEffect, useRef, useState } from 'react'
import { BsCircle, BsFillCircleFill } from 'react-icons/bs'
import { FaGripLinesVertical } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'
import {FiChevronDown, FiChevronUp} from 'react-icons/fi'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AddStudent from '../../components/AddStudent';
import StudentProgress from '../../components/StudentProgress'



export default function unit() {
  const [showModal, setShowModal] = useState(false)
  

  const cancelPresence = () => {
    setShowModal(false)
}
 



  const [unitData, setUnitData] = useState([
    {
      topics: 'Intro To Conditional Statements',
      description: 'In this lesson students will learn the basics of loops and how to apply loops into their programs.',
      date: 'April 10 - April 17',
      status: 'Published',
      show: false,
      id: 1
    },
    {
      topics: 'If Else',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum, rem voluptate cumque odio ex consequuntur velit quae voluptas debitis, numquam fugit consequatur ea corrupti iusto. Placeat autem voluptates voluptate consequuntur excepturi esse ullam ducimus mollitia accusantium, dolor dolorem in.',
      date: 'April 16 - April 19',
      status: 'Published',
      show: false,
      id:2
    }, 
    {
      topics: '	Logical Operators (Boolean Values, Comparison)',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum, rem voluptate cumque odio ex consequuntur velit quae voluptas debitis, numquam fugit consequatur ea corrupti iusto. Placeat autem voluptates voluptate consequuntur excepturi esse ullam ducimus mollitia accusantium, dolor dolorem in.',
      date: '',
      status: 'Unpublished',
      show: false,
      id: 3
    },
    {
      topics: 'Intro to Control Statements',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum, rem voluptate cumque odio ex consequuntur velit quae voluptas debitis, numquam fugit consequatur ea corrupti iusto. Placeat autem voluptates voluptate consequuntur excepturi esse ullam ducimus mollitia accusantium, dolor dolorem in.',
      date: '',
      status: 'Unpublished',
      show: false,
      id: 4
    },
    {
      topics: 'For Loops',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum, rem voluptate cumque odio ex consequuntur velit quae voluptas debitis, numquam fugit consequatur ea corrupti iusto. Placeat autem voluptates voluptate consequuntur excepturi esse ullam ducimus mollitia accusantium, dolor dolorem in.',
      date: '',
      status: 'Unpublished',
      show: false,
      id: 5
    }
  ])

  

  const progressData = [
    {
        name: 'Student A',
        progress: '0%',
        bar: 0,
        Quiz: '',
        Status: ''
    },
    {
        name: 'Student A',
        progress: '0%',
        bar: 0,
        Quiz: '',
        Status: ''
    },
    {
        name: 'Student B',
        progress: '0%',
        bar: 0,
        Quiz: '',
        Status: ''
    }
]

  const handleClick = (id:number)  => {
    const elementIndex = unitData.findIndex((element) => element.id === id);
    console.log(elementIndex)
    let newArr = [...unitData];
    newArr[elementIndex] = {
      ...newArr[elementIndex], 
      show: !newArr[elementIndex].show
    }
    setUnitData(newArr)
  }
  

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='ml-[20rem] px-[5.5rem] py-[2rem]  '>
            <div className='flex justify-between'>
                <h1 className='font-bold text-3xl'>Curriculum</h1>
                <div className='flex gap-2 items-center'>
                    <IoIosAddCircleOutline className='text-4xl ' />
                    <h1 className='text-[1.2rem]'>Add Assignment</h1>
                </div>
            </div>
              <div className="border-[#BDBDBD] pl-[1.5rem] mb-[3rem] pb-3 mt-7 border-b-[1.3px]">
                <h2 className="text-[1.6rem] font-bold">Unit Control</h2>
              </div>
              {/* curriculumn topic section */}
            
              {
                unitData.map((data) => {
                  
                  return (
                    <div key={data.id} className='flex-column bg-white rounded-lg'>
                     <div  className='bg-white flex items-center mt-[.7rem] py-[0.3rem] pl-[10px] rounded-lg'>
                    
                    <div className='border-r-2 flex items-center border-[#E6E6E6] py-5 pr-[4rem]  justify-between w-full'>
                      <div className='flex items-center gap-7'>
                        <FaGripLinesVertical className='text-[#A0A0A0] text-[1.1rem] font-thin' />
                        <p className='font-bold text-[20px]'>{data.topics}</p>
                      </div>
                      <div className='flex justify-around'>
                        <p className='text-[18px] font-semibold'>{data.date}</p>
                        <div  className='flex items-center gap-2 ml-[5rem]'>
                            {data.status == 'Published' ? (<BsFillCircleFill  className='text-[9px]  text-[#62C932]'  />) : <BsCircle className='text-[9px] text-[#B0B0B0]'/>}
                            <p className='text-[18px] font-semibold'>{data.status}</p>
                        </div>
                    </div>
                  </div>
                  <div className='py-5 px-7 text-2xl' onClick={() => handleClick(data.id)}>
                    {data.show ?  <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  </div>
                  {data.show && (
                    <div>
                    <div className="flex  mx-12 py-6 border-[#E6E6E6] border-t-2">
                      {/* first division */}
                      <div className='flex-1 pr-[3rem] border-[#E6E6E6] border-r-2 py-[1rem]'>
                        <div className='flex gap-[3rem]'>
                          <p className='text-[18px] font-bold'>Description</p>
                          <p  className='text-[16px]' >In this lesson students will learn the basics of loops and how to apply loops into their programs.</p>
                        </div>
                        <div className='flex items-center gap-[3rem] mt-4'>
                            <p className='text-[18px] font-bold'>Date Range</p>
                          <div className='flex items-center gap-[2rem]'>
                            <p className='text-[16px] '>April 10 - April 17</p>
                            <p className='text-[16px] underline'>edit</p>
                          </div>
                        </div>
                      </div>

                      {/* second division */}
                        <div className=' flex-1 pl-[3rem] flex flex-col justify-between py-5'>
                          <div className='flex  items-center gap-[4rem]'>
                            <p className='text-[18px] font-bold'>Status</p>
                            <div className="flex gap-[6px] items-center border-2 border-[#E6E6E6] px-3 py-1">
                              {data.status == 'Published' ? (<BsFillCircleFill  className='text-[9px]  text-[#62C932]'  />) : <BsCircle className='text-[9px] text-[#B0B0B0]'/>}
                              <p className='text-[18px] font-semibold'>{data.status}</p>
                              <FiChevronDown />
                            </div>
                          </div>
                          <div className='flex  items-center mt-4 gap-[3rem]'>
                          <p className='text-[18px] font-bold'>Assign To</p>
                            <div className="flex items-center gap-[1rem] ">
                              <IoIosAddCircleOutline className='text-[1.6rem]'onClick={() => setShowModal(true)} />
                              <p className='text-[16px]' >Add Student</p>
                            </div>
                          </div>
                        </div>
                    </div>

                  {/* Student progress section */}
                      <StudentProgress progressData={progressData}/>
                    </div>
                  )}
                  </div>
                  )
                })
                
              }
            </div>
            <AddStudent showModal={showModal} cancelPresence={cancelPresence}/>
    </div>
  )
}
