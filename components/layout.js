import React from 'react'
import Head from "../components/head"
import { string } from 'prop-types'
import "bootstrap/scss/bootstrap.scss"
import "../scss/main.scss"

const Layout = props => (
  <div className= {props.className + " layout"}>
    <Head title={props.title} />

    <div className="content">
      {props.children}
    </div>
  </div>
)

Layout.propTypes = {
  title: string
}

export default Layout