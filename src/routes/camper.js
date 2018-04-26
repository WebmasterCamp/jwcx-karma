import React, {Component} from 'react'
import styled from 'react-emotion'
import {message} from 'antd'

import {app} from '../core/fire'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-image: linear-gradient(rgb(105, 115, 173), rgb(107, 201, 233));
  background-attachment: fixed;

  width: 100%;
  min-height: 100vh;

  padding: 2em 2em;
  max-width: 800px;
`

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 3.2em;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 18.5px 2px;

  width: 100%;
  padding: 1.8em 2.2em;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
`

const Heading = styled.h1`
  margin: 0.5em 0;

  font-size: 2.2em;
  color: #333;
`

const SubHeading = styled.h2`
  margin: 0;
  color: #555;
`

const Meta = styled.h4`
  margin: 0;
  color: #777;
`

const db = app.firestore()

class Camper extends Component {
  state = {}

  async componentDidMount() {
    try {
      const {phone} = this.props.match.params
      const snap = await db.collection('karma').where('phone', '==', phone).get()
      console.log('Snapshot', snap)

      if (snap.empty) {
        message.error(`ไม่พบข้อมูลดังกล่าว`)
        return
      }

      snap.docs[0].ref.onSnapshot(s => {
        const record = s.data()
        console.log(`[+] Record Synchronized:`, record)

        this.setState(record)
      })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    const {phone} = this.props.match.params
    const {id, firstName, lastName, major, points, spent} = this.state

    return (
      <Backdrop>
        <Paper>
          <SubHeading>{firstName} {lastName}</SubHeading>

          <Heading>แต้มบุญ {points - spent} J</Heading>

          <SubHeading>ใช้จ่ายไปแล้ว: {spent} J</SubHeading>
          <SubHeading>แต้มบุญที่ได้: {points} J</SubHeading>

          <Meta>{phone} - {major}</Meta>
        </Paper>
      </Backdrop>
    )
  }
}

export default Camper
