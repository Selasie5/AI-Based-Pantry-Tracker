"use client";
import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
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
    <div className="w-full fixed top-0 left-0 z-50 flex  justify-center md:justify-between items-center px-10 py-5 bg-white">
      <div>
        <h4 className="font-Poppins font-bold text-green-500 text-xl tracking-wide">PantryPal</h4>
      </div>
      <div className="flex justify-between items-center gap-8">
        <div className="relative">
          <input
            placeholder="Search for items in your pantry"
            value={searchQuery}
            className="w-[25rem] px-3 py-[0.70rem] rounded-full text-gray-500 text-sm outline-none border border-gray-400 font-Poppins"
            onChange={handleSearchChange}
          />
          <button className="absolute top-3 right-5 text-gray-500">
            <FiSearch size={20} />
          </button>
        </div>
        <div className="">
         <button className='text-white font-Poppins bg-black px-5 py-2 opacity-30 hover:opacity-100'>
          <Link href="/auth/login">Log Out</Link>
         </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
