import React from 'react'

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <div className='die' onClick={props.holdDice} style={styles}>
        <p className="die-value">{props.value}</p>
    </div>
  )
}

export default Die