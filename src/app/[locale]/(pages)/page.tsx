import React from 'react'
import Faq from './home/Faq'
// import Video from './home/Video'
import Admission from './home/Admissions'
import Apply from './home/Apply'
import Registry from './home/ContactForm'
import Tt  from './home/Tt'
import NavBar from './home/NavBar'
import HeroSection from './home/Hero'


const page = () => {
  return (
    <>
  {/* <NavBar/> */}
  {/* <HeroSection/> */}
  <Apply/>
    <Admission/>
    {/* <Video/> */}
    
      <Faq/>
      <Registry/> 
      {/* <Tt/> */}
    </>
  )
}

export default page
