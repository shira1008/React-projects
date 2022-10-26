import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AppContext, useGlobalContext } from "./context";

//grab the functions from conText.js
const Home = () => {
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <main>
      {/* when click - invoke the function that set isSidebarOpen to true */}
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaBars />
      </button>
      {/* when click - invoke the function that set isModalOpen to true */}
      <button className="btn" onClick={openModal}>
        show modal
      </button>
    </main>
  );
};

export default Home;
