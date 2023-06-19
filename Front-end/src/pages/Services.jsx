import React, { useState } from 'react'
import Hero from '../components/services/Hero'
import Service from '../components/services/Service'

const Services = () => {
  const[search,setSearch]=useState("")
  return (
    <>
    <Hero search={search} setSearch={setSearch}/>
    <Service search={search}/>
    </>
  )
}

export default Services