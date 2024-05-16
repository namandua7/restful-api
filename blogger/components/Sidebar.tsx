import { handleArticleCreation } from '@/helpers';
import Link from 'next/link'
import React, { useState } from 'react'

export default function Sidebar() {

  const [keyword, setKeyword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleNewArticle = async () => {
    const response = await handleArticleCreation(title, description, keyword);
    setKeyword("");
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">ChatBoat</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                  <a href="/chat" className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li>
                  <Link href="/keywords" legacyBehavior>
                    <a className="nav-link px-0 align-middle">
                      <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Keywords</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="#submenu1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="nav-link px-0 align-middle">
                    <i className="bi bi-plus-lg"></i><span className="ms-1 d-none d-sm-inline">New</span>
                  </a>
                </li>
              </ul>
              <div className="dropdown pb-4">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">loser</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Article</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Keyword</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleNewArticle}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
