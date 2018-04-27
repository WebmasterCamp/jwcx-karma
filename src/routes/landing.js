import React from 'react'
import styled from 'react-emotion'

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
  margin: 0;
  text-align: center;

  font-size: 2.2em;
  font-weight: 300;
  color: #333;
`

const Landing = () => (
  <Backdrop>
    <Paper>
      <Heading>JWCx Karma Points System</Heading>
    </Paper>
  </Backdrop>
)

export default Landing
