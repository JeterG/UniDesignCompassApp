import React from "react"
import styled from 'styled-components';
import { Box, Text, Button, Grid } from 'grommet';
import { Link } from 'gatsby';

export const NavContainer = styled(Box)`
  width: 90%;
  height: 10%;
  min-height: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const LogoBox = styled(Box)`
  width: 20%;
  font-size: 2.8rem;
  font-weight: 550;
`
export const LinkContainer = styled(Box)`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 20rem;
`
export const GatsbyLinkContainer = styled(Link)`
  text-decoration: none;
  color: black;
  align-self: center;
`
export const LinkButton = styled(Button)`
  font-size: 1.2rem;
  transition: all 0.3s;
  border: 0.15rem solid #5567FD;
  border-radius: 2rem;
  background-color:#5567FD;
  color: white; 
`;
export const GatsbyLink = ({to,label,primary}) => (
  <GatsbyLinkContainer to={to}>
    {primary ? <LinkButton label={label}/> : label}
  </GatsbyLinkContainer>
)
export const MainViewContainer = styled(Grid)`
  width: 90%;
  margin: 0 auto;  
  margin-top: 1rem;
`
export const MainContent = styled(Box)`
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 3.5rem;
  display: flex;
  align-self: start;
  text-align: left;
`
export const AuthContainer = styled(Box)`
  font-size: 3.5rem;
  font-weight: 900;
  display: flex;
  align-self: start;
  text-align: center;
  border-left: 0.1rem solid rgba(0,0,0,0.1);
`
export const AboutContainer = styled(Box)`
`
export const ContactContainer = styled(Box)`
  
`