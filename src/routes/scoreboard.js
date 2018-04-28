import React, {Component} from 'react'
import styled from 'react-emotion'
import {Row, Col} from 'antd'

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
  padding: 1.6em 1.8em;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
`

const Heading = styled.h1`
  margin: 0;
  text-align: center;

  font-size: 2.2em;
  font-weight: 300;
  color: #333;
`

const Name = styled.h4`
  margin: 0;
  text-align: center;
  font-size: 2em;
`

const Points = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2.1em;
`

const houseNames = [
  'Aprodrite',
  'Ares',
  'Demiter',
  'Dionisus',
  'Hades',
  'Hestia',
]

const db = app.firestore()

class Scoreboard extends Component {
  state = {record: []}

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

  render() {
    const {record} = this.state

    return (
      <Backdrop>
        <Paper>
          <Heading>JWCx Scoreboard: แต้มบุญ</Heading>
        </Paper>

        <Row type="flex" justify="start" gutter={32}>
          {houseNames.map(house => (
            <Col xs={24} sm={12} lg={6} key={house}>
              <Paper>
                <Name style={{margin: 0, fontSize: '1.2em'}}>
                  คะแนนกลุ่ม {house}
                </Name>
                <Points>
                  {record
                    .filter(x => x.house === house)
                    .map(x => x.points || 0)
                    .reduce((x, y) => x + y, 0)}
                </Points>
              </Paper>
            </Col>
          ))}
        </Row>

        <Row
          type="flex"
          justify="start"
          gutter={32}
          style={{marginTop: '1.5em'}}>
          {record.filter(item => item.phone).map(item => (
            <Col xs={24} sm={12} lg={6} key={item.id}>
              <Paper>
                <Name style={{fontSize: '1.1em'}}>
                  {item.nick}{' '}
                  <small>
                    ({item.firstName} {item.lastName})
                  </small>
                </Name>
                <Points>
                  {item.points}
                  <small style={{fontSize: '0.5em', fontWeight: 300}}>
                    {' '}
                    pts
                  </small>
                </Points>
                <div style={{fontSize: '0.9em'}}>{item.house}</div>
              </Paper>
            </Col>
          ))}
        </Row>
      </Backdrop>
    )
  }
}

export default Scoreboard
