/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Amplify from 'aws-amplify';

import {AccountBar, CompassBar} from "./SideBarComponents"
import { LayoutContainer,SidebarContainer, MainViewContainer } from "../styles/layout"
import {globalStore} from "../context/context"

import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Layout = ({ children }) => {
  const {user, compass} = globalStore()
  return (
    <LayoutContainer >
      <SidebarContainer>
      { user.email && <AccountBar />}
      { (user.email && compass.title) && <CompassBar compass={compass}/> }
      </SidebarContainer>
      <MainViewContainer>
        {children}
      </MainViewContainer>
    </LayoutContainer>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
