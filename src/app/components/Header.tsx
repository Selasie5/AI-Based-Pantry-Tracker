"use client";
import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { SiShutterstock } from "react-icons/si";
import { Button } from '@mui/material';
import { auth } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from "next/link"

const buttonStyle = {
  backgroundColor: '#000000',
  color: '#ffffff',
  paddingBlock: '12px',
  paddingInline: '32px',
  width: '100%',
  marginBlock: 2,
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
};

interface HeaderProps {
  onSearch: (query: string) => void; // Prop to handle search query
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();
  const logOut = () => {
    signOut(auth);
    router.push("/auth/login");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Notify parent component of the search query
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex flex-col md:flex-row justify-center md:justify-between items-center px-2 md:px-10 py-5 bg-white">
      <div className='flex justify-center items-center gap-24 md:gap-56'>
        <div className='flex justify-center items-center gap-2'>
<SiShutterstock  size={34} className='text-blue-700'/>
        <h4 className="font-Poppins font-bold text-gray-900 text-xl tracking-wide">PantryPal</h4>
      </div>
      <div className="md:hidden">
         <button className='bg-gray-200 text-black text-xs md:text-sm font-Poppins rounded-[0.5rem] px-6 py-[0.8rem] hover:bg-blue-200 hover:font-bold transition-all'>
          <Link href="/auth/login">Log Out</Link>
         </button>
        </div>
      </div>
     
      <div className="flex  flex-col justify-center md:flex-row md:justify-between items-center gap-8 pt-5 md:pt-0 w-full md:w-[50%]">
        <div className="relative">
          <input
            placeholder="Search for items in your pantry"
            value={searchQuery}
            className="w-[25rem] md:w-[25rem] px-3  py-[1rem] md:py-[0.70rem] rounded-[0.5rem] text-gray-500 text-sm outline-none bg-gray-100 font-Poppins"
            onChange={handleSearchChange}
          />
          <button className="absolute top-3 right-5 text-gray-500">
            <FiSearch size={20} />
          </button>
        </div>
        <div className="hidden md:block">
         <button className='bg-gray-200 text-black text-xs md:text-sm font-Poppins rounded-[0.5rem] px-6 py-[0.8rem] hover:bg-blue-200 hover:font-bold transition-all'>
          <Link href="/auth/login">Log Out</Link>
         </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
