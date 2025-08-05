import React from 'react'
import Image from 'next/image'
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const Navbar = () => {
    return (
        <div className="shadow-sm bg-base-100 px-10 py-3">
            <div className="flex justify-between items-center">
                {/* Left: Logo + Title */}
                <a className="flex items-center gap-2 text-xl font-semibold">
                    <Image src="/shield.png" alt="Logo" width={55} height={55} />
                    <div className={orbitron.className}><p className='text-[#014A9F] font-bold'>Secure Tunnel</p></div>
                </a>

                {/* Right: Menu */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>

                {/* Mobile dropdown */}
                <div className="lg:hidden">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
