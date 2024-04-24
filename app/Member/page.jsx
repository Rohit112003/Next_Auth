import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const page = async () => {
  const session  = await getServerSession(options)
  if(!session){
    redirect("api/auth/signin?callbackUrl=/Member")
   
  }
  return (
    <>
    
    <h1>Member Server section</h1>    
    <p>{session?.user?.email}</p>
    <p>{session?.user?.role}</p>
    
    
    
    
    

    </>
         
  )
}

export default page