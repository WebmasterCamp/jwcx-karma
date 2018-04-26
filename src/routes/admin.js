import React from 'react'

const Admin = ({match}) => (
  <div>
    <h1>Topup Page</h1>

    <div>
      <span>{match.params.phone}</span>
    </div>
  </div>
)

export default Admin
