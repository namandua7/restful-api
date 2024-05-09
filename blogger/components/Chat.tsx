import React from 'react';

export default function Chat() {
  return (
    <div style={{ height: "100vh" }}>
      <button className="btn btn-primary top-0 end-0 m-3">+ New</button>
      <div className="container rounded-5 border border-3 d-flex flex-column justify-content-between h-100">
        <h2 className='text-center my-2'>Which Article you want to read today?</h2>
        <input className='form-control my-3' type="text" />
      </div>
    </div>
  );
}
