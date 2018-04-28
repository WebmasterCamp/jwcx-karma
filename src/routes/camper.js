import React, {Component} from 'react'
import styled from 'react-emotion'
import {message, Spin} from 'antd'

import {app} from '../core/fire'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(rgb(105, 115, 173), rgb(107, 201, 233));
  background-attachment: fixed;

  width: 100%;
  min-height: 100vh;

  padding: 0 2em;
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
  text-align: center;
  margin: 0.5em 0;

  font-size: 2.2em;
  color: #333;
`

const SubHeading = styled.h2`
  margin: 0;
  color: #555;
  text-align: center;
`

const Character = styled.img`
  width: 11em;
  margin-top: -5em;
`

const db = app.firestore()

const getCharacter = major => require(`../assets/${major}.svg`)

class Camper extends Component {
  state = {record: [], house: null}

  async componentDidMount() {
    const {phone} = this.props.match.params

    const camperSnap = await db
      .collection('karma')
      .where('phone', '==', phone)
      .get()

    if (camperSnap.empty) {
      message.error(`ไม่พบแคมเปอร์ในระบบ`)
      return
    }

    const {
      id,
      nick,
      firstName,
      lastName,
      major,
      house,
    } = camperSnap.docs[0].data()

    this.setState({id, nick, firstName, lastName, major, house})

    const snap = db.collection('karma').onSnapshot(snap => {
      const record = snap.docs
        .map(x => ({...x.data(), id: x.id}))
        .sort((a, b) => a.firstName && a.firstName.localeCompare(b.firstName))
        .sort((a, b) => b.points - a.points)
        .filter(x => x.house === house)

      console.log(`[+] Scoreboard Synchronized:`, record)

      this.setState({record})
    })
  }

  render() {
    const {phone} = this.props.match.params
    const {record, nick, firstName, lastName, major, house} = this.state

    if (!major) {
      return (
        <Backdrop>
          <Paper>
            <Spin />
          </Paper>
        </Backdrop>
      )
    }

    const sum = (x, y) => x + y
    const points = record.map(x => x.points || 0).reduce(sum, 0)
    const spent = record.map(x => x.spent || 0).reduce(sum, 0)

    return (
      <Backdrop>
        <Character src={getCharacter(major)} />
        <Paper>
          <SubHeading>
            {nick} ({firstName} {lastName})
          </SubHeading>

          <Heading>
            <small>แต้มบุญของ {house}: </small>
            <b>{points}</b>{' '}
            <small style={{fontWeight: 500, fontSize: '0.65em'}}>แต้ม</small>
          </Heading>

          <SubHeading>
            ใช้ไปแล้ว <b style={{fontSize: '1.3em'}}>{spent}</b> แต้ม
          </SubHeading>
        </Paper>
      </Backdrop>
    )
  }
}

export default Camper
