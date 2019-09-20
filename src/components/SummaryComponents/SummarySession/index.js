import React, { useContext, useState, useEffect } from 'react';
import { getCompass, getSession, getInteraction } from "../../../utils/queries";
import { GlobalContext } from '../../../context/context';
// import SummaryLog from '../SummaryLog/index';
import SummaryLog from '../SummaryLog/'

const SummarySession = () => {
  const { compass } = useContext(GlobalContext)
  const [sessions, setSession] = useState([])
  // get all sessions of the compass
  // const [allSessions, setAllSessions] = useState([])
  const [expandLog, setExpandLog] = useState("")
  const [currentCompass, setCurrentCompass] = useState("")
  const [render, showRender] = useState(false)

  //Mounting once when the page loads
  useEffect(() => {
    getCompass(compass)
      //.then(res => getCurrentCompass(res.data.getCompass.name_of_compass))
      .then(res => {

        // replaced by below
        setSession(res.data.getCompass.sessions.items)

        // array of all sessions in the compass
        // setAllSessions(res.data.getCompass.sessions.items)
        setCurrentCompass(res.data.getCompass.name_of_compass)
        // conso  le.log(res)
      })
      .catch(err => console.log(err))
  }, [])


  // 1. get all sessions

  // getCompass(compass)
  //.then(res => getCurrentCompass(res.data.getCompass.name_of_compass))
  // .then(res => {
    // array of all sessions in the compass
    // setAllSessions(res.data.getCompass.sessions.items)
  // })

  // 2. get All interactions with a selected session
  // getSession(compass)
  //.then(res => get(res.data.getSession.name_of_session)){
  // })


  // 3. get data for selected interaction
  // getInteraction(interaction)
  //.then(res => setInteraction(res.data.getInteraction.interaction))
  // })


  // get intreraction logs
  const getSessionLogs = (id) => {
    // console.log("Getting session logs"
    getInteraction(id)
      .then(res => {
        setExpandLog(res.data.getInteraction)
        console.log(res.data.getInteraction)
        showRender(!render)
      })
      .catch(err => console.log('getSessionLogs err:', err))
  }


  const SessionTable = ({ sessions }) => {
    return (
      <table>
        <tbody>
          <tr><th>Session Name</th><th>Session Description</th><th>Created At</th><th>step</th><th>log</th></tr>
          {sessions.map(session =>
            session.interactions.items.map((interaction, i) => (
              <tr key={interaction.id} onClick={() => getSessionLogs(interaction.id)}>
                <td>{session.name_of_session}</td>
                <td>{session.description_of_session.substring(0, 10) + "..."}</td>
                <td>{session.createdAt.substring(0, 19)}</td>
                <td>{interaction.step.name_of_step}</td>
                <td>{interaction.log_content.substring(0, 5) + "..."}</td>
              </tr>
            ))

          )}
        </tbody>
      </table>
    )
  }

  const renderLog = () => {
    showRender(!render)
  }

  const storeLog = expandLog.log_content;
  const attachments = expandLog.attachments;

  return (
    <>
    { 
      render ? <SummaryLog currentLog={storeLog} showLog={renderLog} attachments={attachments} /> 
      : <SessionTable sessions={sessions} /> 
    }
    </>
    
  )
}

export default SummarySession;


