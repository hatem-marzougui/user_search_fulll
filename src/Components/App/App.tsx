import React from "react";
import "./App.css";
import Header from "../Header/Header";
import UsersList from "../UsersList/UsersList";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <UsersList />
    </div>
  );
};

export default App;
