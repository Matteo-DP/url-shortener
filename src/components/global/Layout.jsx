import Script from 'next/script'
import React, { useEffect } from 'react'
import Header from './Header'

export default function Layout({ children }) {

  useEffect(() =>
  {        
      document.body.classList.add("bg-bgdark");
      document.body.classList.add("text-textlight");
  });

  return (
    <>
      <Script src="https://kit.fontawesome.com/2ad3ea3c29.js" crossorigin="anonymous" />
      <main>
        <Header />
        {children}
      </main>
    </>
  )
}
