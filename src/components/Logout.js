import React from 'react'

const logout = () => {
  document.cookie = 'cow_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.href = '/login'
}

const Logout = () => {
  return (
    <span
      style={{
        position: 'absolute',
        top: '2%',
        right: '2%',
        cursor: 'pointer',
      }}
      onClick={logout}>
      Logout
    </span>
  )
}

export default Logout
