import HomePageLayOut from '@/components/Layout/HomePageLayOut';
import React from 'react'

const about = () => {
  return (
    <div>About us page</div>

  )
}

export default about;

about.getLayout = function getLayout(page){
  return (
      <HomePageLayOut>
          {page}
      </HomePageLayOut>
  )
}