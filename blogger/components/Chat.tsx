import React, { useState, useEffect } from 'react';
import { handleSearch } from '../helpers';
import '../styles/global.css';

export default function Chat() {
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ title: string; desciption: string }[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleSearch(value);
    setQuestions(prevQuestions => [...prevQuestions, value]);
    if (response) {
      setAnswers(prevAnswers => [...prevAnswers, response]);
    }
    setValue("");
  };

  return (
    <div style={{ height: "100vh" }}>
      <button className="btn btn-primary mx-3 my-3">+ New</button>
      <div className="container rounded-5 border border-3 d-flex flex-column justify-content-between h-75">
        <h2 className='text-center mt-4'>Which Article you want to read today?</h2>
        <div className="overflow-auto p-3">
          {questions.map((question, index) => (
            <div key={index} className="my-3">
              <div style={{ width: "auto" }} className="my-3 border rounded-5">
                <p style={{textAlign: "right", fontWeight: "bold", position: "relative", right: "30px", top: "8px"}}>{question}</p>
              </div>
              {answers[index] && (
                <>
                  <div>
                    <h3>{answers[index].title}</h3>
                    <p>{answers[index].desciption}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div className="input-group w-50 position-relative">
              <input type="text" className="form-control my-3" placeholder='Ask anything' value={value} onChange={handleChange} />
              {value && (
                <button className="btn btn-primary position-absolute rounded-end" style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }} type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
