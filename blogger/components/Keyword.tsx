import React, { useState, useEffect } from 'react';
import { getArticleKeywords } from '@/helpers';

export default function Keyword() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    getKeywords();
  }, []);

  const getKeywords = async () => {
    const data = await getArticleKeywords();
    const extractedKeywords = data.map((article: any) => article.keyword);
    setKeywords(extractedKeywords);
  };

  return (
    <>
      <h1 className='text-center mt-3'>Keywords</h1>
      <div className="container my-5 d-flex justify-content-center">
        <div>
          <ul>
            {keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}