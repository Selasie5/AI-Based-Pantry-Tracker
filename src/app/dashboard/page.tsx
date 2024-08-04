"use client"
import React, { useState } from 'react';
import Header from '../components/Header';
import PantryList from '../components/dashboard/PantryList';
import { useAuth } from '../../../context/auth/AuthProvider';

const Page = () => {
  const time = new Date();
  const hours = time.getHours();
  let customGreeting = "Hey there";

  if (hours >= 0 && hours <= 12) {
    customGreeting = "Good morning";
  } else if (hours > 12 && hours < 17) {
    customGreeting = "Good afternoon";
  } else {
    customGreeting = "Good evening";
  }

  const { user } = useAuth();
  const userName = user?.displayName || 'Guest';

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch=(query:string)=>
  {
    setSearchQuery(query)
  }
  return (
    <section className=" pt-28 md:pt-16"> {/* Add padding-top to prevent overlap */}
      <Header onSearch={handleSearch}/>
      <section className=' md:px-10 py-10 space-y-5'>
        {/* Custom Greeting */}
        <div className='space-y-1 px-4 md:px-0'>
          <h1 className=" text-[1.4rem] md:text-[1.65rem] font-medium font-Poppins text-black">
            {customGreeting}, <span className='font-bold'>{userName}</span>
          </h1>
          <p className='font-Poppins text-sm font-normal text-gray-500'>
            Here&apos;s what your pantry is looking like today
          </p>
        </div>
        <PantryList searchQuery={searchQuery} />
      </section>
      <div className='flex justify-center items-center'>
      <span className='text-gray-400 font-Poppins text-sm'>*Camera and recipe generation AI coming soon in v2.0.0*</span>
      </div>
    </section>
  );
};

export default Page;
