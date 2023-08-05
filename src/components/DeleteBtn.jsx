import React from 'react'

export default function DeleteBtn(props) {
  return (
      <button onClick={props.onClick} {...props} />
  )
}
