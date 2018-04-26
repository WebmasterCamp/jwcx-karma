export const roleNames = {
  admin: 'ผู้ดูแลระบบ',
  camper: 'น้องค่าย',
}

export const roleName = role => roleNames[role] || role

export const isAdmin = role => role === 'admin'

export function isAllowed(targetRole, currentRole) {
  if (currentRole === targetRole) {
    return true
  }
}

export default roleName
