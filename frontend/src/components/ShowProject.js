import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowProject(props) {
  return (
    <>
    <div className={`my-4 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Project Information</h3>
      </div>
      <div className="my-4 mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name of project</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{JSON.parse(localStorage.getItem('project')).name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Details of project</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{JSON.parse(localStorage.getItem('project')).description}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Total Tasks:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{JSON.parse(localStorage.getItem('project')).tasks_count}</dd>
          </div>
          <div className="my-5 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About Project Manager</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Name: {JSON.parse(localStorage.getItem('user')).name}
              <br />
              Email: {JSON.parse(localStorage.getItem('user')).email}
              <br />
              Contact: {JSON.parse(localStorage.getItem('user')).contact}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <Link className="mx-4 btn btn-primary" to={`/projects/${JSON.parse(localStorage.getItem('project')).id}/boards`}>Boards</Link>
    </>
  )
}
