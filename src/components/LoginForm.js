import React from 'react'
import styled from 'react-emotion'
import {reduxForm, Field} from 'redux-form'

import TextInput from '../components/Input'
import Button from '../components/Button'

const LoginForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit} style={{width: '100%', padding: '1em 1em'}}>
    <Field
      name="password"
      placeholder="รหัสผ่าน..."
      component={TextInput}
      type="password"
    />
    <div style={{marginTop: '1.5em', alignSelf: 'flex-end'}}>
      <Button type="primary" htmlType="submit" size="large" icon="login">
        เข้าสู่ระบบ
      </Button>
    </div>
  </form>
)

const validate = values => {
  const errors = {}

  if (!values.password) {
    errors.password = 'โปรดระบุรหัสผ่าน'
  }

  return errors
}

const enhance = reduxForm({form: 'login', validate})

export default enhance(LoginForm)
