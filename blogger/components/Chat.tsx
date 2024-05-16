import React, { useState, useEffect, useRef } from 'react';
import { handleSearch } from '../helpers';
import '../styles/global.css';

export default function Chat() {
  const [chatMode, setChatMode] = useState(false);
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ title: string; desciption: string }[]>([]);
  const [printedChunks, setPrintedChunks] = useState<string[]>([]);
  const printedChunksRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleSearch(value);
    setQuestions(prevQuestions => [...prevQuestions, value]);
    setChatMode(true);
    if (response) {
      printChunks(response.desciption);
      setAnswers(prevAnswers => [...prevAnswers, response]);
    }
    setValue("");
    setPrintedChunks([]);
  };

  const chunkArray = (str: string, chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const printChunks = (description: string) => {
    const chunkedArray = chunkArray(description, 15);
    let index = -1;
    const interval = setInterval(() => {
      if (index < chunkedArray.length) {
        setPrintedChunks(prevChunks => [...prevChunks, chunkedArray[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);
  };

  useEffect(() => {
    if (printedChunksRef.current) {
      printedChunksRef.current.scrollTop = printedChunksRef.current.scrollHeight;
    }
  }, [printedChunks]);

  return (
    <div>
      <div className="container w-100 rounded-5 d-flex flex-column justify-content-between" style={{height: "100vh", marginLeft: "100px" }}>
        {chatMode ? null : <h2 className='text-center mt-4'>Which Article you want to read today?</h2> }
        <div className="overflow-auto p-3 mt-5" ref={printedChunksRef}>
          {questions.length >= 2 && questions.slice(0, -1).map((question, index) => (
            <div key={index} className="my-3">
              <div className="inline-flex flex-col w-auto my-3 border rounded-5">
                <p style={{textAlign: "right", fontWeight: "bold", position: "relative", right: "30px", top: "8px"}}>{question}</p>
              </div>
              {answers[index] && (
                <>
                  <div>
                    <h3>{answers[index]?.title}</h3>
                    <p>{answers[index]?.desciption}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          {questions.map((question, index) => (
            <div key={index} className="my-3">
              {index === questions.length - 1 && answers[index] && (
                <div>
                  <div style={{ width: "auto" }} className={`my-3 border rounded-5 ${index === questions.length - 1 ? "last-question" : ""}`}>
                    <p style={{textAlign: "right", fontWeight: "bold", position: "relative", right: "30px", top: "8px"}}>{question}</p>
                  </div>
                  <h3>{answers[index]?.title}</h3>
                  <p>
                    {printedChunks.map((chunk, index) => (
                      <React.Fragment key={index}>
                        {chunk}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div className="w-75 position-relative my-4">
              <input type="text" className="border border-black form-control my-3 h-100" placeholder='Ask anything' value={value} onChange={handleChange} />
              {value && (
                <div style={{ position: "absolute", top: "25px", right: "0" }} className="my-4 mx-3">
                  <button className="btn btn-primary rounded-end" style={{ width: "43px", height: "40px", top: '50%', transform: 'translateY(-50%)' }} type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="justify-content-center align-items-center d-flex rounded-end" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                  </svg>
                </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
