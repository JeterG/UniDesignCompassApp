import styled from "styled-components"
import {
  Box,
  Grid,
  Text,
  Menu
} from "grommet"

// Time Line elements
export const TimeLineContainer = styled(Box)`
  width: 100%;
  //min-height: 15rem;
  //margin : 1rem auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
export const TimeLineBar = styled(Box)`
  margin: 1rem auto;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  background: transparent;
`;
export const InteractionBar = styled(Box)`
  width: ${ props => props.width ? props.width : 0};
  background: ${ props => props.color ? props.color : 'white'};
  margin: 0 0.2rem;
  height: 100%;
`;
export const ToolBox = styled(Box)`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  text-align: center;
  background: ${ props => props.color ? props.color : 'white'};
  border: 0.1rem solid ${ props => props.color ? props.color : 'white'};
  border-radius: 0.3rem;
  width: auto;
  height: auto;
  color: white;
  display: flex;
  flex-direction: column;
`
export const ToolBoxText = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
export const ToolLabel = styled.p`
  font-size: 1.0rem;
  font-wieght: 700;
  margin: 0;
`
export const ToolValue = styled.span`
  font-size: 1rem;
  margin-left: 0.4rem;
`

// Pie chart elements
export const PieChartContainer = styled(Box)`
  width: ${ props => props.container === "overall" ? '95%' : '65%'};
  min-width:${ props => props.container === "overall" ? '22.125rem' : '23.3125rem'}; 
  height: 100%;
  min-height:${ props => props.container === "overall" ? '21.125rem' : '21.3125rem'}; 
  margin : 1rem auto;
`;

// Grids and Containers
export const AnalyticsGrid = styled.div`
  // height: 90%;
  width: 100%;
  overflow: auto;

  @media (max-width: 375px) {
    display: contents;
    height: 100vh;
  }

`;

export const SelectedArea = styled(Box)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`

export const OverallArea = styled(Box)`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  background-color: white;

  @media (max-width: 375px) {
    overflow: hidden;
  }
`

export const ContainerHeader = styled(Box)`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderText = styled(Text)`
  font-weight: 600;
  font-size: 1.8rem;
  word-break: break-word;
  line-height: 2.1rem;
`
export const SessionSelector = styled(Menu)`
  width: 100%;
`

export const AnalyticsContainer = styled.div`
  width: 100%;
`