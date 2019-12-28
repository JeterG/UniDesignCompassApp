import React, { useContext } from 'react'
import styled from "styled-components"
import { GlobalContext } from "../../context/context"
import { getUser } from "../../utils/queries"
import { createCompass, createStep, createSession } from "../../utils/mutations"
import { navigate } from "gatsby"
import { Link } from "gatsby"

const QuickTemplate = (props) => {
  const { user } = useContext(GlobalContext);

  const defaultCompass = [
    {
      title: "Grasp Challenge",
      description: "Understanding the challenge/ problem ",
      color: "#3498db"
    },
    {
      title: "Research",
      description: "Investigating/ Researching ideas to incorporate into a solution",
      color: "#2ecc71"
    },
    {
      title: "Brainstorm",
      description: "Creating ideas/ rough drafts of solutions",
      color: "#9b59b6"
    },
    {
      title: "Test",
      description: "Created and test new solutions",
      color: "#f1c40f"
    },
    {
      title: "Prototype",
      description: "Choosing the best solution and implementing it",
      color: "#e67e22"
    },
    {
      title: "Revise",
      description: "Edit/revise current implementation of solution",
      color: "#e74c3c"
    },
    {
      title: "Reflect",
      description: "Discuss the overall reflection of the process",
      color: "#7f8c8d"
    }
  ];

  const goToReview = (event) => {
    const compassID = createCompass("Untitled", "-", "default", user.id)
      .then(res => {
        defaultCompass.forEach((step, key) =>
          createStep(step.title, step.description, step.color, res.data.createCompass.id)
        )
        navigate(`/Compass/?c=${res.data.createCompass.id}`)
        createSession("untitled", " ", res.data.createCompass.id)
          .then((result) => {
            navigate(`/Compass/?c=${res.data.createCompass.id}&s=${result.data.createSession.id}`)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))


    console.log(compassID)
  };

  return (
    <TemplateContainer onClick={goToReview}>
      <ProjectTypeDetails>
        <CompassCircle>
          {
            defaultCompass.map((item, key) => (
              <StepContainer
                key={key}
                circleLength={defaultCompass.length}
                rotateAngle={key * (360 / (defaultCompass.length))}
                color={item.color}
              />
            )
            )
          }
        </CompassCircle>
      </ProjectTypeDetails>
      <CompassCardTitle>Quick Start</CompassCardTitle>
    </TemplateContainer>
  )
}

export default QuickTemplate

export const TemplateContainer = styled.div`
  padding: 0 1rem;
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
export const ProjectTypeDetails = styled.div`
  cursor: pointer;
  height: 9rem;
  width: 100%!important;
  color: black;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  background: white;
  box-shadow: 0 1px 3px 0 #d2d4d6;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  
`;
export const CompassCardTitle = styled.div`
  width: 100%;
  height: 1rem;
  color: black;
  font-weight: 450;
  font-size: 0.9rem;
  text-align: center;
  
`;
export const CompassCircle = styled.div`
  min-width: 7.7rem;
  min-height: 7.7rem; 
  height: 100%;
  position: relative;
  margin: 0 auto;
`
export const StepContainer = styled.div`
  border: 0.15rem solid ${props => props.color ? props.color : '#5567FD'};
  border-radius: 50%;
  transition: all 0.3s;
  top: 40%;
  left: 40%;
  background-color: ${props => props.color ? props.color : '#5567FD'};
  list-style: none;
	height: 1.4rem;
  width: 1.4rem;
  display: block;
	position: absolute;
  transform: ${props => `rotate(${props.rotateAngle}deg) translate(${props.circleLength * 0.32}rem) rotate(-${props.rotateAngle}deg)` || 'none'};
`