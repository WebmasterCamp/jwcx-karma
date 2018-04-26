import React from 'react'
import styled from 'react-emotion'
import {Spin} from 'antd'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 100vw;
  min-height: 100vh;

  background-image: linear-gradient(rgb(105, 115, 173), rgb(107, 201, 233));
  background-attachment: fixed;

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

const NotFound = () => (
  <Container>
    <Paper>
      <Spin />
    </Paper>
  </Container>
)

export default NotFound
