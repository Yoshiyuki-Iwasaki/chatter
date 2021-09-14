import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-28 md:w-9/12 p-3 md:p-0 mx-auto mb-16">
        <div className="flex">
          <div className="mr-5 md:w-1/6 bg-gray-100">
            <Sidebar />
          </div>
          <div className="md:w-5/6">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout
