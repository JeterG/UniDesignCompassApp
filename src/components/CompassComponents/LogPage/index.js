import React,{ useState, useEffect, useContext} from "react";
import { 
  LoggerGrid,
  LoggerInput, 
  LoggerTA, 
  StepName,
  LoggerInnerNav,
  CompassButton,
  SessionView,
  SessionHeader,
  SessionTitle,
  SessionDescription,
  StepClock,
  TimerButton,
  AttachmentButton,
  SessionAttachments
} from "../../../styles/CompassPage"
import Attachment from "./Attachment"

import { Storage } from 'aws-amplify'
import uuid from 'uuid/v4'
import { getInteraction } from '../../../utils/queries'
import { updateInteraction, uploadAttachment } from '../../../utils/mutations'
import config from '../../../aws-exports'
import {GlobalContext} from "../../../context/context"

const Logger = ({showAttachment}) => {
  const {interaction, removeInteraction} = useContext(GlobalContext);

  const [step, setStep] = useState('');
  const [log, setLog] = useState('');
  const [attachments,setAttachments] = useState([])
  const [time,setTime] = useState(0)
  const [start,setStart] = useState(true)

  const id = interaction
  
  useEffect(() => {
    getInteraction(id).then((res) => {
      const {log_content, attachments, duration, step} = res.data.getInteraction
      setTime(duration)
      setStep(step)
      setLog(log_content)
      setAttachments(attachments.items)
    })

  }, [id])

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => setTime(time+1), 1000)

    } else if (!start && time !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [start,time])
  
  const changeToCompass = (e) => {
    const newInteraction = {
      id ,
      log_content: log,
      duration: time,
    } 
    updateInteraction(newInteraction).then(() => {
      removeInteraction()
    })
  }

  const translateTime = (secs) => {
    const sec_num = parseInt(secs, 10)
    const hours   = Math.floor(sec_num / 3600)
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60

    return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":") 
  }

  const pause = (e) => {
    const newInteraction = {
      id,
      log_content: log,
      duration: time,
    }
    if (start)  updateInteraction(newInteraction)
    
    return setStart(!start)
  }

  const handleUpload = async (event) => { 
    const { target: { files } } = event
    const [image] = files || []
    if (image) {
      const { name: fileName, type: mimeType } = image
      const fileForUpload = {
        bucket: config.aws_user_files_s3_bucket,
        key:  `${uuid()}${fileName}`,
        region: config.aws_user_files_s3_bucket_region,
        name: fileName,
        type: mimeType,
      }
    
      try {
        await Storage.put(fileForUpload.key, image, { contentType: mimeType })
        uploadAttachment({...fileForUpload,attachmentInteractionId: interaction})
          .then((res) => {
            setAttachments([res.data.createAttachment, ...attachments])
          })
      } catch (err) {
        console.log('error cannot store file: ', err)
      }
    }
  }

  return (
    <LoggerGrid
      rows={['15%', '85%']}
      columns={['80%', '20%']}
      fill
      areas={[
        { name: 'header', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [0, 1], end: [0, 1] },
        { name: 'session', start: [1, 0], end: [1, 1] },
      ]}
    >
      <LoggerInnerNav gridArea="header" >
        <CompassButton onClick={changeToCompass}/>
        <StepName> {step.name_of_step} </StepName>
        <AttachmentButton  onChange={handleUpload} />
      </LoggerInnerNav>
      <LoggerTA gridArea="main" >
        <LoggerInput
          placeholder="Enter Log"
          value={log}
          onChange={event => setLog(event.target.value)}
        />
      </LoggerTA>
      <SessionView 
        rows={['25%', '15%', '60%']}
        columns={['fill']}
        fill
        areas={[
          { name: 'header', start: [0, 0], end: [0, 0] },
          { name: 'description', start: [0, 1], end: [0, 1] },
          { name: 'attachments', start: [0, 2], end: [0, 2] },
        ]}
        gridArea="session"
      >
        {
          step.name_of_step ? (
            <>
            <SessionHeader gridArea="header">
              <SessionTitle>
                {step.name_of_step}
              </SessionTitle>
              <StepClock>
                {translateTime(time)}
                <TimerButton onClick={pause} start={start}/>
              </StepClock>
            </SessionHeader>
              <SessionDescription gridArea="description">
                {step.description_of_step}
              </SessionDescription>
              <SessionAttachments gridArea="attachments">
                <h1>Attachments</h1>
                { 
                  attachments.length > 0 && 
                  attachments.map((item) => (
                    <Attachment key={item.key} attachment={item} showAttachment={showAttachment}/>
                  )) 
                }
              </SessionAttachments>
            </>
          ) : ''
        }
      </SessionView>
    </LoggerGrid>
  );
}
export default Logger;
