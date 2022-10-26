import React, { useState, useContext } from "react";

//wrap all app cause the btns that open the modal and the sidebar in diff file than the modal and sidebar

const AppContext = React.createContext();

//have to access the children
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  //modal

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook כדי לא לעשות כל פעם מלא אימפורטים לשניהם, לעשות אימפורט רק לזה
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
