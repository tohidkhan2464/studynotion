import React from 'react'

const States = [
    {count :"5K", label:"Active Students"},
    {count :"10+", label:"Mentors"},
    {count :"200", label:"Courses"},
    {count :"50+", label:"Awards"},
];


const StatesComponent = () => {
  return (
    <section  className=" font-semibold w-11/12 max-w-maxContent mx-auto">
        <div className='flex items-center justify-center py-20'>
            <div className='flex flex-row mobile:flex-col items-center justify-center gap-10'>
                {
                    States.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center justify-center gap-3 w-[300px]'>
                                <h1 className='text-4xl'>
                                    {data.count}
                                </h1>
                                <h2 className=' font-normal text-richblack-300'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatesComponent