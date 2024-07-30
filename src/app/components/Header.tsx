"use client";
import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-between items-center px-10 py-5 bg-white">
      <div>
        <h4 className="font-Poppins font-bold text-green-500 text-xl tracking-wide">PantryPal</h4>
      </div>
      <div className="flex justify-between items-center gap-8">
        <div className="relative">
          <input
            placeholder="Search for items in your pantry"
            value={searchQuery}
            className="w-[25rem] px-3 py-[0.70rem] rounded-full text-gray-500 text-sm outline-none border border-gray-400 font-Poppins"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute top-3 right-5 text-gray-500">
            <FiSearch size={20} />
          </button>
        </div>
        <div className="bg-black w-10 h-10 rounded-full flex justify-center items-center">
          <span className="text-white text-sm font-Poppins font-semibold mx-auto">AK</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
