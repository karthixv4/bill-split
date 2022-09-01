import React from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchGroupById } from '../../reducers/oneGroup';
import { useParams } from 'react-router-dom';
import './expense.css';

const Expenses = () => {
    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchGroupById(id))
    },[])
    const users = useSelector((state) => state.oneGroup.group.members);
  
    const group = useSelector((state) => state.oneGroup.group);
   
    const expense = useSelector((state) => state.oneGroup.group.expense);

  return (
   <div className='containers'>
   {expense.length>0?expense.map((ele)=>(
    <div class="shadow-lg rounded-2xl w-2/6 p-4 bg-white dark:bg-gray-800">
   
    <div class="flex flex-row items-start gap-4">
   
        <div class="h-28 w-full flex flex-col justify-between">
            <div>
                <p class="text-gray-800 dark:text-white text-xl font-medium">
                  {ele.name}
                </p>
               
            </div>
            <div class="rounded-lg bg-blue-100 dark:bg-white p-2 w-full">
                <div class="flex items-center justify-between text-xs text-gray-400 dark:text-black">
                    <p class="flex flex-col">
                       Shared
                        <span class="text-black dark:text-indigo-500 font-bold">
                            {ele.sharedAmong.length}
                        </span>
                    </p>
                    <p class="flex flex-col">
                        Amount
                        <span class="text-black dark:text-indigo-500 font-bold">
                        {ele.amount}
                        </span>
                    </p>
                    <p class="flex flex-col">
                        Rating
                        <span class="text-black dark:text-indigo-500 font-bold">
                            9.3
                        </span>
                    </p>
                </div>
            </div>
        </div>
         
    </div>

</div>
)):<div class="bg-gray-50 w-full">
<div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
  <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    <span class="block">Your group has no Expense :(</span>
    <span class="block text-indigo-600">Create one now :)</span>
  </h2>
  
</div>
</div>}
   {/* {expense.map((ele)=>(
    <div class="shadow-lg rounded-2xl w-2/6 p-4 bg-white dark:bg-gray-800">
   
    <div class="flex flex-row items-start gap-4">
   
        <div class="h-28 w-full flex flex-col justify-between">
            <div>
                <p class="text-gray-800 dark:text-white text-xl font-medium">
                  {ele.name}
                </p>
               
            </div>
            <div class="rounded-lg bg-blue-100 dark:bg-white p-2 w-full">
                <div class="flex items-center justify-between text-xs text-gray-400 dark:text-black">
                    <p class="flex flex-col">
                       Shared
                        <span class="text-black dark:text-indigo-500 font-bold">
                            {ele.sharedAmong.length}
                        </span>
                    </p>
                    <p class="flex flex-col">
                        Amount
                        <span class="text-black dark:text-indigo-500 font-bold">
                        {ele.amount}
                        </span>
                    </p>
                    <p class="flex flex-col">
                        Rating
                        <span class="text-black dark:text-indigo-500 font-bold">
                            9.3
                        </span>
                    </p>
                </div>
            </div>
        </div>
         
    </div>

</div>
))} */}

   
</div>
  )
}

export default Expenses