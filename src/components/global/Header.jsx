import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import OutsideClickHandler from 'react-outside-click-handler';

export default function Header() {

    const { currentUser } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <header className={`flex flex-row justify-between items-center text-textlight ${currentUser ? "px-8 py-4" : "p-8"}`}>
            <ul className='h-min'>
                <li className='inline-block hover:text-accentpurple ease-in-out duration-75'>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className='inline-block ml-8 hover:text-accentpurple ease-in-out duration-75'>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>
            <ul className='h-min flex items-center gap-8'>
                <li className={`inline-block ${!currentUser && "hover:text-accentpurple ease-in-out duration-75"}`}>
                    {currentUser ?
                        <p className='text-textdarker'>
                            { currentUser.email }
                        </p>
                        :
                        <Link href="/auth/login">
                            Login
                        </Link>
                    }
                </li>
                {currentUser &&
                    <li className='inline-block'>
                        <OutsideClickHandler
                            onOutsideClick={() => setIsOpen(false)}
                        >
                            <button onClick={() => toggleIsOpen()}>
                                <svg width="49" height="49" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="48.5" cy="33.5" r="22.5" fill="#D9D9D9"/>
                                    <mask id="mask0_1_55" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="16" y="50" width="69" height="69">
                                    <circle cx="50.5" cy="84.5" r="34.5" fill="#868686"/>
                                    </mask>
                                    <g mask="url(#mask0_1_55)">
                                    <circle cx="39" cy="39" r="39" fill="#D9D9D9"/>
                                    </g>
                                </svg>
                            </button>
                            {isOpen &&
                                    <div className='absolute bg-textlight rounded-lg right-8 top-20 p-8 text-bgdarker text-md'>
                                        <ul>
                                            <li className='mb-4 hover:text-accentpurple ease-in-out duration-75'>
                                                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li className='hover:text-accentpurple ease-in-out duration-75'>
                                                <Link href="/auth/logout" onClick={() => setIsOpen(false)}>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                            }
                        </OutsideClickHandler>
                    </li>               
                }
            </ul>
        </header>
    )
}
