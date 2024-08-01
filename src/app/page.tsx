"use client"
import React from "react"
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion"

export default function Home() {
  return (
    <main className="py-2">
      <header className="flex justify-between items-center py-3 px-2 md:px-10">
         <motion.div
         initial={{
          opacity: 0
         }}
         animate={{
          opacity: 1
         }}
         transition={{
          duration: 0.1
         }}
         >
          <h4 className="font-Poppins font-bold text-green-500 text-xl tracking-wide">PantryPal</h4>
         </motion.div>
         <div className="space-x-5">
          <motion.button
          initial={{
            opacity: 0
           }}
           animate={{
            opacity: 1
           }}
           transition={{
            duration: 0.3
           }}
           className="bg-green-500 text-white text-sm font-Manrope rounded-md px-6 py-[0.8rem]">
            <Link href="/auth/signup">
            Get Started 
            </Link>
          </motion.button>
          <motion.button 
          initial={{
            opacity: 0
           }}
           animate={{
            opacity: 1
           }}
           transition={{
            duration: 0.5
           }}
          className="border-[1.5px] border-black text-black text-sm font-Manrope rounded-md px-6 py-[0.8rem]">
            <Link href="/auth/login">
            Login To Account 
            </Link>
          </motion.button>
         </div>
      </header>
      <hr/>
      <section className="md:h-[90vh]  py-5 md:py-0  md:mt-0 px-10 flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-14">
       <div className="md:w-3/5 flex flex-col gap-2 text-center md:text-left">
         <motion.h1
         initial={{
          opacity: 0,
          x: -100,
         }}
         animate={{
          opacity: 1,
          x: 0
         }}
         transition={{
          duration: 0.7,
          delay: 0.2
         }}
          className="font-Poppins font-semibold text-5xl md:text-[4rem] text-black leading-tight">
          Track , manage and enjoy your pantry perfectly organized
         </motion.h1>
         <motion.p 
         initial={{
          opacity: 0,
          x: -100,
         }}
         animate={{
          opacity: 1,
          x: 0
         }}
         transition={{
          duration: 0.7,
          delay: 0.4
         }}
         className="font-Poppins text-sm text-black/40 leading-normal md:w-2/3">PantryPal is here to revolutionize how you manage your pantry. Say goodbye to the chaos of expired food and last-minute grocery runs. With our easy-to-use app, you can keep track of everything in your pantry, fridge, and freezer.</motion.p>
       </div>
       <motion.div
       initial={{
        opacity: 0,
        x: 100,
       }}
       animate={{
        opacity: 1,
        x: 0
       }}
       transition={{
        duration: 0.7,
        delay: 0.2
       }}
        className="md:w-2/5">
<Image src="/hero-img.jpg" width={500} height={500} alt="Kitchen Pantry"/>
       </motion.div>
      </section>
    </main>
  );
}
