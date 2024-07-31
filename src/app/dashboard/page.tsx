import React from 'react';
import Header from '../components/Header';
import PantryList from '../components/PantryList';

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

  const userName="James"
  return (
    <section className="pt-20"> {/* Add padding-top to prevent overlap */}
      <Header />
      <section className='px-10 py-10 space-y-5'>
        {/* Custom Greeting */}
        <div className='space-y-1'>
        <h1 className="text-[1.65rem] font-medium font-Poppins text-black">{customGreeting}, {userName}</h1>
        <p className='font-Poppins text-sm font-normal text-gray-500'>Here&apos;s what your pantry is looking like today</p>
        </div>
        <PantryList/>
      </section>
    </section>
  );
};

export default Page;
