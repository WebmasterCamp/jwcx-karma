import React, {Component} from 'react'
import {Row, Col, message} from 'antd'
import styled from 'react-emotion'

import Button from '../components/Button'
import {TextInput} from '../components/Input'

import {app} from '../core/fire'

const houseNames = [
  'Aprodrite',
  'Ares',
  'Demiter',
  'Dionisus',
  'Hades',
  'Hestia',
]

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
  margin: 0.5em 0;

  font-size: 2.2em;
  color: #333;
`

const SubHeading = styled.h2`
  margin: 0;
  color: #555;
`

const db = app.firestore()

class Points extends Component {
  state = {record: [], score: 0}

  async componentDidMount() {
    const snap = db.collection('karma').onSnapshot(snap => {
      const record = snap.docs
        .map(x => ({...x.data(), id: x.id}))
        .sort((a, b) => a.firstName && a.firstName.localeCompare(b.firstName))
        .sort((a, b) => b.points - a.points)

      console.log(`[+] Scoreboard Synchronized:`, record)

      this.setState({record})
    })
  }

  give = async house => {
    const {record, amount} = this.state

    record.filter(x => x.house === house).forEach(async camper => {
      const {id, points, spent, nick} = camper

      const camperRef = db.collection('karma').doc(id)

      await db.runTransaction(async transaction => {
        const snap = await transaction.get(camperRef)
        const record = snap.data()
        const total = parseInt(record.points) + parseInt(amount)

        const data = {points: total}

        transaction.set(camperRef, data, {merge: true})
      })

      message.success(`Given ${amount} Points to ${house}!`)
    })
  }

  render() {
    return (
      <Backdrop>
        <Paper>
          <Heading>แจกคะแนนทั้งบ้าน</Heading>

          <TextInput
            style={{marginBottom: '1.5em'}}
            onChange={e => this.setState({score: e.target.value})}
            value={this.state.score}
          />

          <Row type="flex" justify="start" gutter={32}>
            {houseNames.map(house => (
              <Col
                md={6}
                sm={12}
                xs={24}
                key={house}
                style={{marginBottom: '1em'}}>
                <Button
                  onClick={() => this.give(house)}
                  style={{width: '100%'}}
                  size="large">
                  แจกคะแนนให้ {house}
                </Button>
              </Col>
            ))}
          </Row>
        </Paper>
      </Backdrop>
    )
  }
}

export default Points
