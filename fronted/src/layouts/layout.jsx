import React from 'react'
import Headers from '../componets/header/header'
import Routerss from '../routers/routers'
import Footer from '../componets/footer/footer'

const Layout = () => {
  return (
    <div>
        <Headers></Headers>
        <main>
            <Routerss></Routerss>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Layout