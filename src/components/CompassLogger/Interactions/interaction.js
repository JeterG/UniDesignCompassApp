import React, { useContext } from "react";
import styled from "styled-components"
import { LinkNext } from "grommet-icons"
import { Button } from "grommet"
import { navigate } from "gatsby"

import translateTime from "../../../utils/translateTime"
import { CompassContext } from "../../../context/CompassPage/context"
import * as Mutation from '../../../utils/mutations'


const Interaction = (props) => {
  const { compass, session, interaction, interactionAdded, newestInteraction, pauseTimer, startTimer, pause, newestLog, newestDuration } = useContext(CompassContext);
  const { step = { name_of_step: "", color: "" }, id } = props.interaction;

  const openReviewLog = async (evt) => {
    evt.preventDefault()
    // clicking addInteraction when 

    if (interaction.id !== id) {
      props.setLoading(true);
      if (interactionAdded) {
        pauseTimer()
        const newInteraction = {
          id: newestInteraction.id,
          log_content: newestLog ? newestLog : " ",
          duration: newestDuration ? newestDuration : 0
        }
        await Mutation.updateInteraction(newInteraction)
      }
      navigate(`/Logger/?c=${compass.id}&s=${session.id}&i=${id}`)
    } else if (newestInteraction.id === id){
      if(pause){
        startTimer()
      } else {
        pauseTimer()
      }

    }

  }

  const duration = newestInteraction.id === id ? newestDuration : props.interaction.duration

  return (
    <InteractionContainer className="recent-steps-help">
      <InteractionButtonContainer>
        <InteractionButton
          label={step.name_of_step}
          color={step.color}
          onClick={openReviewLog}
          active={interaction.id === id}
        />
        <span>{translateTime(duration)}</span>
      </InteractionButtonContainer>

      {!props.isLastStep && <LinkNext color="#5567FD" />}
    </InteractionContainer>


  )
};
export default Interaction;

const InteractionContainer = styled.div`
  margin: 0 0.5rem;
  min-width: 7.6rem;
  min-height: 7rem;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  svg {
    margin-bottom: 1rem;
  }
`;
const InteractionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  span {
    font-size: 0.8rem;
  }
`;
const InteractionButton = styled(Button)`
  border: 0.15rem solid ${props => props.color ? props.color : '#5567FD'};
  :hover {
    transition: background-color 150ms, border 150ms, background-color 0.2s;
    background-color: transparent;
    ${props => props.active && props.color && `border: 0.35rem solid ${props.color}`};
    ${props => props.active && `box-shadow: 0 3px 6px 0 #999999;`}
  }
  border-radius: 50%;
  transition: all 0.3s;
  padding: 0.5rem;
  color: black; 
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 0.8rem;
  height: 5rem;
  width: 5rem;
  background-color: ${props => !props.active && props.color ? props.color : 'transparent'};

`;
