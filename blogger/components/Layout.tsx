import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useTheme } from '../components/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  theme?: string;
}

export default function Layout(props: LayoutProps) {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className={`d-flex justify-content-center ${theme}`}>
        <Sidebar theme={theme} />
        <div className='position-absolute w-50'>
          {props.children}
        </div>
      </div>
    </>
  );
}
