import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='flex flex-row'>
            <nav className="bg-white md:w-60 text-white py-7 px-5">
                <h1 className='text-black text-center'>SALADMAKER</h1>
                <ul>
                    <li className='m-2'>
                        <a className='flex p-2 rounded bg-[#F8B602] cursor-pointer '>
                            Salad maker
                        </a>
                    </li>
                    <li className='m-2'>
                        <a className='flex p-2 rounded hover:bg-[#cbc1a5] cursor-pointer text-[#A098AE] '>
                            Recipe
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
