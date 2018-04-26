import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {Router, Route, Switch} from 'react-static'

import Login from '../routes/login'
import Landing from '../routes/landing'
import Camper from '../routes/camper'
import Admin from '../routes/admin'
import NotFound from '../routes/404'

import history from '../core/history'

function getByRole(role) {
  if (role === 'admin') {
    return Admin
  }

  return Camper
}

const Routes = ({user}) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/:phone" component={getByRole(user.role)} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

const mapStateToProps = state => ({
  user: state.user,
})

const enhance = connect(mapStateToProps)

export default enhance(Routes)
