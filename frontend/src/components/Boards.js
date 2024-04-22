import React from 'react'
import { Link } from 'react-router-dom'

export default function Boards(props) {
  return (
    <>
      <Link to={`/projects/${JSON.parse(localStorage.getItem('project')).id}/boards/new`}>
        <button type="button" className="mx-3 my-4 mr-5 btn btn-primary">+ New</button>
      </Link>
    </>
  )
}
