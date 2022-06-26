import React from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPageLayout = ({children}) => {
  return (
    <div>
        <Navs/>
        <Title title="BOX OFFICE" subtitle="Holla! This is Box Office!"/>
        {children}
    </div>
  )
}

export default MainPageLayout