import styled from 'styled-components';
import { Box, Text,Grid } from 'grommet'
import { Link } from 'gatsby';

export const NavigationContainer = styled(Box)`
  text-align: center;
  width: 30%;
  min-width: 3rem;
  background: #e5e5e5;
  margin: 0;
`;

export const NavLink = styled(Link)`
  margin-top: 2rem;
  width: 100%;
  align-self: center;
`;

export const CompassSideBar = styled(Box)`
  width: 70%;
  background: #5361FE;
  display: flex;
  flex-direction: column;
`

export const CompassText = styled(Text)`
  margin: 0 auto;
  padding: 1em;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 900;
  color: white;
  text-align: center;
`

export const LinkContainer = styled(Box)`
  flex-direction: column;
  align-items: center;
`;

export const CompassLink = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 3rem;
  color: white;
  text-decoration: none;
  font-weight: 560;
  justify-content: space-evenly;
  align-items: center;
  min-width: 9rem;
  svg {
    fill: black;
    stroke: black;
  }
`