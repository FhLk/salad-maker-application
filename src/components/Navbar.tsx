'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const [selectPage, setSelectPage] = useState<number>(0);
    const btnCSSDefault : string = "flex p-2 rounded-[16px] h-[60px] justify-center items-center hover:bg-[#cbc1a5] hover:text-white cursor-pointer text-[#A098AE]"  ;
    const btnCSSSelect : string = "flex p-2 rounded-[16px] h-[60px] justify-center items-center bg-[#F8B602] cursor-pointer";


    return (
        <div className='flex flex-row'>
            <nav className="bg-white md:w-60 text-white py-7 px-5">
                <h1 className='text-black text-center text-3xl'>SALADMAKER</h1>
                <ul>
                    <li className='m-2 text-center text-lg font-bold'>
                        <Link href={'/'} onClick={()=>setSelectPage(0)} 
                        className={selectPage === 0 ? btnCSSSelect : btnCSSDefault}>
                            Salad maker
                        </Link>
                    </li>
                    <li className='m-2 text-center text-lg font-bold'>
                        <Link href={'/recipe'} onClick={()=>setSelectPage(1)} 
                        className={selectPage === 1 ? btnCSSSelect : btnCSSDefault}>
                            Recipe
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
