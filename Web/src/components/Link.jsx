import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkPersonalizado({caminho,children}) {
  return (
    <div>
        <Link to={caminho}><p>{children}</p></Link>
    </div>
  )
}
