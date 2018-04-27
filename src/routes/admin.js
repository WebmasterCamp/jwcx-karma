import React, {Component, Fragment} from 'react'
import styled from 'react-emotion'
import {message, Spin} from 'antd'

import Button from '../components/Button'
import {TextInput} from '../components/Input'

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
  margin: 0.2em 0;

  font-size: 2.2em;
  color: #333;
`

const SubHeading = styled.h2`
  margin: 0;
  color: #555;
`

const Meta = styled.h4`
  margin: 0;
  color: #666;
`

const db = app.firestore()

class Admin extends Component {
  state = {amount: 0}

  async componentDidMount() {
    try {
      const {phone} = this.props.match.params

      if (!phone) {
        this.setState({scanNotice: true})

        return
      }

      const snap = await db
        .collection('karma')
        .where('phone', '==', phone)
        .get()

      if (snap.empty) {
        message.error(`ไม่พบแคมเปอร์ในระบบ`)
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

  give = async () => {
    const {id, amount, points, spent, firstName} = this.state
    const camperRef = db.collection('karma').doc(id)

    await db.runTransaction(async transaction => {
      const snap = await transaction.get(camperRef)
      const record = snap.data()
      const total = record.points + amount

      const data = {points: total}

      transaction.set(camperRef, data, {merge: true})

      message.success(`Given ${amount} Points to ${firstName}! Total: ${total}`)
    })
  }

  take = async () => {
    const {id, amount, points, spent, firstName} = this.state
    const camperRef = db.collection('karma').doc(id)

    await db.runTransaction(async transaction => {
      const snap = await transaction.get(camperRef)
      const record = snap.data()
      const total = record.spent + amount

      const data = {spent: total}

      transaction.set(camperRef, data, {merge: true})

      message.success(
        `Taken ${amount} Points from ${firstName}. Total: ${total}`,
      )
    })
  }

  render() {
    const {phone} = this.props.match.params
    const {
      id,
      scanNotice,
      firstName,
      lastName,
      major,
      points,
      spent,
    } = this.state

    if (scanNotice) {
      return (
        <Backdrop>
          <Paper>
            <Heading>เข้าสู่ระบบแล้ว!</Heading>
            <SubHeading>
              ใช้ตัวสแกน QR Code ในโทรศัพท์ เพื่อเพิ่มหรือลดแต้มบุญของน้องๆ
              ได้เลย
            </SubHeading>
          </Paper>
        </Backdrop>
      )
    }

    if (!id) {
      return (
        <Backdrop>
          <Paper>
            <Spin />
          </Paper>
        </Backdrop>
      )
    }

    return (
      <Backdrop>
        <Paper>
          <SubHeading>
            {firstName} {lastName}
          </SubHeading>

          <Heading>
            แต้มบุญ {points - spent} <small>J</small>
          </Heading>

          <Meta>
            ใช้จ่ายไปแล้ว {spent} <small>J</small>
          </Meta>

          <Meta>
            แต้มบุญที่ได้ {points} <small>J</small>
          </Meta>

          <div style={{marginTop: '1em'}}>
            <TextInput
              type="number"
              placeholder="จำนวน"
              onChange={e => this.setState({amount: parseInt(e.target.value)})}
              value={this.state.amount}
            />

            <Button
              onClick={this.give}
              type="primary"
              style={{width: '100%', margin: '1em 0'}}>
              เพิ่มแต้มบุญ
            </Button>

            <Button onClick={this.take} type="danger" style={{width: '100%'}}>
              ลดแต้มบุญ
            </Button>
          </div>
        </Paper>
      </Backdrop>
    )
  }
}

export default Admin
