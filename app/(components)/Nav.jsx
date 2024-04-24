import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'

const Nav = async () => {
    const sesssion = await getServerSession(options)
  return (
    <header className='bg-gray-600 text-white '>
        <nav className='flex justify-between items-center w-full px-10 py-4'>
            <div>My Site</div>
            <div className='flex gap-10   '>
                <Link href='/' className='no-underline'>Home</Link>
                <Link href='/CreateUSer' className='no-underline'>CreateUser</Link>
                <Link href='/ClientMember' className='no-underline'>Client Member</Link>
                <Link href='/Member' className='no-underline'>Member</Link>
                <Link href='/Public' className='no-underline'>public</Link>
                {sesssion?<Link href='api/auth/signout?callbackUrl=/'>Logout</Link>:<Link href='api/auth/signin?'>Login</Link>}
            </div>   
            
        </nav>
    </header>
  )
}

export default Nav