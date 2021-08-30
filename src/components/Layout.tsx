import React from 'react'
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-32 md:w-9/12 p-3 md:p-0 mx-auto mb-16">{children}</div>
    </>
  );
}

export default Layout
