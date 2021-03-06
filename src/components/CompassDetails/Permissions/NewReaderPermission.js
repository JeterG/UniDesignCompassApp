import React, { useState, useContext, useEffect } from 'react';
import { getUsers } from '../../../utils/queries';
import { createReaderCompasses } from '../../../utils/mutations';
import { CompassContext } from "../../../context/CompassPage/context";
import { GlobalContext } from "../../../context/context";
import { Loader } from "../../../styles/layout"
import {
  PermissionContainer,
  PermissionHeaderBar,
  PermissionHeaderBox,
  PermissionFormContainer,
  PermissionForm,
  Permissions,
  PermissionButton,
} from "./style"

const ReadersPermission = () => {
  const { compass, updateCompass } = useContext(CompassContext);
  const { user } = useContext(GlobalContext);

  const [disableButton, setdisableButton] = useState(true)
  const [loading, setLoading] = useState(false)
  const [reader, setReader] = useState("");

  useEffect(() => {
    const teachers = compass.teachers.items.filter((teacher) => teacher)
    const teacher = teachers.length > 0 ? teachers.find((t) => t) : " "

    if (compass.owner.id === user.id || (teacher.hasOwnProperty("email") && (teacher.email === user.email))) {
      setdisableButton(false)
    }

    // eslint-disable-next-line
  }, [compass.id])

  const handleReaderChange = (e) => { setReader(e.target.value) };

  const handleSubmit = (e) => {
    e.preventDefault()

    getUsers(reader)
      .then(res => {
        setLoading(true)
        return createReaderCompasses(compass.id, res.data.listUsers.items[0].id, res.data.listUsers.items[0].first_name, res.data.listUsers.items[0].last_name, res.data.listUsers.items[0].email)
      })
      .then(res => {
        setReader("");
        setLoading(false);
        updateCompass(res.data.createReaderCompasses.compass);
      })
      .catch(err => console.log('failed at getUser', err))

  }

  return (
    <PermissionContainer>
      <PermissionHeaderBar>
        <PermissionHeaderBox>Add Reader</PermissionHeaderBox>
      </PermissionHeaderBar>
      <PermissionFormContainer>
        <PermissionForm onSubmit={handleSubmit}>
          <Permissions>
            <input
              style={{ border: "none", borderBottom: "2px solid #f4f6f9", fontSize: "large", width: "250px" }}
              type="email"
              className="email"
              value={reader}
              placeholder="Enter Reader Email"
              onChange={handleReaderChange}
              required
            />
          </Permissions>
          {loading ? <Loader /> : <PermissionButton type="submit" primary label="Submit" disabled={disableButton} />}
        </PermissionForm>
      </PermissionFormContainer>
    </PermissionContainer>
  )
}

export default ReadersPermission;
