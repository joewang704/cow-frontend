import React from 'react'
import moment from 'moment'

const SettingsModal = ({ isOpen, id, closeSettings, item }) => {
  if (isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '10%',
            left: '15%',
            width: '70%',
            height: '80%',
            backgroundColor: '#fff',
            zIndex: 10,
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgb(255, 138, 128)',
              width: '100%',
              height: '10%',
              lineHeight: '200px',
              borderRadius: '10px 10px 0px 0px',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
              fontSize: '16px',
              paddingLeft: '10px',
              paddingRight: '10px',
            }}
          >
            <span>
              Settings
            </span>
            <i
              className="fa fa-times"
              onClick={closeSettings}
            ></i>
          </div>
          <div
            style={{
              margin: '20px',
              color: '#333',
              fontSize: '15px',
            }}
          >
            <div>Time: {moment(item.actualDate).format('MM-DD-YYYY HH:mm:ssa')}</div>
            <div>Set new time: <input type="text"/></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default SettingsModal

