import React from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPageLayout = ({children}) => {
  return (
    <div>
        <Title title="BOX OFFICE" subtitle="Holla! This is Box Office!"/>
        <Navs/>
        {children}
    </div>
  )
}

export default MainPageLayout