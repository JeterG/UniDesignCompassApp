import React, { useState, useContext, useEffect } from 'react';
import { getUsers } from '../../utils/queries'
import { updateCompass, updateCompassPermissions, createTeacherCompasses, createMemberCompasses, createReaderCompasses } from '../../utils/mutations'
import { CompassContext } from "../../context/CompassPage/context"
import { GlobalContext } from "../../context/context"
import styled from "styled-components"
import { AddCircle } from 'grommet-icons'
import { Button } from 'grommet'

const CompassPermissions = () => {
  const { compass } = useContext(CompassContext);
  const { user } = useContext(GlobalContext);
  console.log(compass)
  console.log(user)

  const [disableButton, setdisableButton] = useState(true)

  useEffect(() => {
    const teachers = compass.teachers.items.filter((teacher) => teacher)
    console.log("TEAHCERS HOOK1", teachers)
    const teacher = teachers.length > 0 ? teachers.find((t) => t) : " "
    // const teacher = teachers.length > 0 ? "YO" : " "
    // console.log('teacher', teacher.email)
    // const check = teacher.email
    console.log("TEAHCERS HOOK2", teacher)

    if (compass.owner.id === user.id || (teacher.hasOwnProperty("email") && (teacher.email === user.email))) {
      setdisableButton(false)
    }
  }, [compass.id])

  const [scribe, setScribe] = useState("")

  const blankTeacher = {};
  const [teacher, setTeacher] = useState([
    { ...blankTeacher },
  ]);

  const addTeacher = () => {
    setTeacher([...teacher, { ...blankTeacher }]);
  };

  const handleTeacherChange = (e) => {
    const updatedTeachers = [...teacher];
    updatedTeachers[e.target.dataset.idx][e.target.className] = e.target.value;
    setTeacher(updatedTeachers);
  };

  const blankMember = {};
  const [member, setMember] = useState([
    { ...blankMember },
  ]);

  const addMember = () => {
    setMember([...member, { ...blankMember }]);
  };

  const handleMemberChange = (e) => {
    const updatedMembers = [...member];
    updatedMembers[e.target.dataset.idx][e.target.className] = e.target.value;
    setMember(updatedMembers);
  };

  const blankReader = {};
  const [reader, setReader] = useState([
    { ...blankReader },
  ]);

  const addReader = () => {
    setReader([...reader, { ...blankReader }]);
  };

  const handleReaderChange = (e) => {
    const updatedReaders = [...reader];
    updatedReaders[e.target.dataset.idx][e.target.className] = e.target.value;
    setReader(updatedReaders);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("NOT PASSED HERE YET")
    console.log(scribe)
    console.log("PASS HERE")

    getUsers(scribe)
      .then(res =>
        updateCompass(compass.id, compass.name_of_compass, compass.description_of_compass, res.data.listUsers.items[0].id)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      ).catch(err => console.log(err))

    teacher.map((t) => {
      console.log(t)

      getUsers(t.email)
        .then(res =>
          createTeacherCompasses(compass.id, res.data.listUsers.items[0].id, res.data.listUsers.items[0].first_name, res.data.listUsers.items[0].last_name, res.data.listUsers.items[0].email)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        ).catch(err => console.log('failed at getUser', err))

    })

    member.map((m) => {
      console.log(m)

      getUsers(m.email)
        .then(res =>
          createMemberCompasses(compass.id, res.data.listUsers.items[0].id, res.data.listUsers.items[0].first_name, res.data.listUsers.items[0].last_name, res.data.listUsers.items[0].email))
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .catch(err => console.log('failed at getUser', err))
    })

    reader.map((r) => {
      console.log(r)

      getUsers(r.email)
        .then(res =>
          createReaderCompasses(compass.id, res.data.listUsers.items[0].id, res.data.listUsers.items[0].first_name, res.data.listUsers.items[0].last_name, res.data.listUsers.items[0].email))
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .catch(err => console.log('failed at getUser', err))
    })
  }

  return (
    <PermissionContainer>
      <PermissionHeader>Permission</PermissionHeader>
      <PermissionFormContainer>
        <PermissionForm onSubmit={handleSubmit}>

          <ScribeContainer>
            <label>
              Scribe:
              <input type="email" name="scribe" value={scribe} onChange={e => { setScribe(e.target.value) }} />
            </label>
          </ScribeContainer>

          <TeacherContainer>
            <PermissionButtom
              onClick={addTeacher}
              icon={AddCircle}
            ><AddCircle /> </PermissionButtom>
            {
              teacher.map((val, idx) => {
                const teacherId = `name-${idx}`;
                return (
                  <div key={`teacher-${idx}`}>
                    <label >{`Teacher #${idx + 1}`}</label>
                    <input
                      size="35"
                      type="email"
                      name={teacherId}
                      data-idx={idx}
                      id={teacherId}
                      className="email"
                      value={teacher[idx].name}
                      onChange={handleTeacherChange}
                    />
                  </div>
                );
              })
            }
          </TeacherContainer>

          <MemberContainer>
            <PermissionButtom
              onClick={addMember}
              icon={AddCircle}
            ><AddCircle /> </PermissionButtom>
            {
              member.map((val, idx) => {
                const memberID = `name-${idx}`;
                return (
                  <div key={`member-${idx}`}>
                    <label >{`Member #${idx + 1}`}</label>
                    <input
                      size="35"
                      type="email"
                      name={memberID}
                      data-idx={idx}
                      id={memberID}
                      className="email"
                      value={member[idx].name}
                      onChange={handleMemberChange}
                    />
                  </div>
                );
              })
            }
          </MemberContainer>

          <ReaderContainer>
            <PermissionButtom
              onClick={addReader}
              icon={AddCircle}
            ><AddCircle /> </PermissionButtom>

            {
              reader.map((val, idx) => {
                const readerID = `name-${idx}`;
                return (
                  <div key={`reader-${idx}`}>
                    <label >{`Reader #${idx + 1}`}</label>
                    <input
                      size="35"
                      type="email"
                      name={readerID}
                      data-idx={idx}
                      id={readerID}
                      className="email"
                      value={reader[idx].name}
                      onChange={handleReaderChange}
                    />
                  </div>
                );
              })
            }
          </ReaderContainer>
          {/* <PermissionSubmit type="submit" primary label="Submit" /> */}
          <button type="submit" disabled={disableButton}>Submit</button>
        </PermissionForm>
      </PermissionFormContainer>
    </PermissionContainer>
  );
};
export default CompassPermissions

export const PermissionContainer = styled.div`
  width: 83%;
  min-height: 15rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 #d2d4d6;
  transition: box-shadow 150ms ease;
`

export const PermissionHeader = styled.div`
  text-align: left;
  padding-left: 0.5rem;
  margin: 0 auto;
  width: 100%;
  height: auto;
  font-size: 1.5rem;
  color: black;
  font-weight: 600;
`

export const PermissionFormContainer = styled.div`
  margin-top: 1rem;
  overflow: auto;
`

export const PermissionForm = styled.form`
`

export const PermissionButtom = styled.button`
  float: right
`

export const ScribeContainer = styled.div`
  margin-bottom: 0.5em;
  font-size: 1.2rem;
  padding-left: 1em;
  padding-right: 1em;
`

export const TeacherContainer = styled.div`
  margin-bottom: 0.5em;
  font-size: 1.2rem;
  padding-left: 1em;
  padding-right: 1em;
`

export const MemberContainer = styled.div`
  margin-bottom: 0.5em;
  font-size: 1.2rem;
  padding-left: 1em;
  padding-right: 1em;
`

export const ReaderContainer = styled.div`
  margin-bottom: 0.5em;
  font-size: 1.2rem;
  padding-left: 1em;
  padding-right: 1em;
`

export const PermissionSubmit = styled(Button)`
svg {
  transition: all 0.3s;
  fill: white; 
  stroke: white;
  height: 1.2rem;
  width: 1.2rem;
}
background: #5567FD; 
color: white;
padding: 0.3rem 0.7rem;
margin: 0;
font-size: 0.9rem;
font-weight: 500;
`