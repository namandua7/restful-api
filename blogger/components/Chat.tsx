import React, { useState } from 'react';

export default function Chat() {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ height: "100vh" }}>
      <button className="btn btn-primary mx-3 my-3">+ New</button>
      <div className="container rounded-5 border border-3 d-flex flex-column justify-content-between h-75">
        <h2 className='text-center my-5'>Which Article you want to read today?</h2>
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <div className="input-group w-50 position-relative">
            <input type="text" className="form-control my-3" value={value} onChange={handleChange} />
            {value && (
              <button className="btn btn-primary position-absolute rounded-end" style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
