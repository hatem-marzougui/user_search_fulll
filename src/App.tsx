import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import UsersList from "./Components/UsersList/UsersList";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <UsersList />
    </div>
  );
};

export default App;
