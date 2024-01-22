import React from "react";
import ResponsiveAppBar from "../NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
    </div>
  );
};

export default Layout;
