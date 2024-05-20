import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  theme?: string;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className={`d-flex justify-content-center`}>
        <Sidebar theme={props.theme} />
        <div className='position-absolute w-50'>
          {props.children}
        </div>
      </div>
    </>
  );
}
