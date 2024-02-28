import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Note from "./components/Note";

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // Function to handle group click event and update selected group
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedGroupId(group._id);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-full max-h-full">
      {/* Sidebar */}
      <div className="relative flex flex-col w-full md:w-3/12 border-solid border-black items-center justify-center pt-5 p-3 md:h-screen">
        {/* Pass the handleGroupClick function as a prop to Sidebar */}
        <Sidebar handleGroupClick={handleGroupClick} />
      </div>
      {/* Main Content */}
      <div className="relative w-full md:w-9/12 bg-blue-100 h-screen">
        {/* Conditionally render either the Home or Note component */}
        {selectedGroup ? <Note groupId={selectedGroupId} group={selectedGroup}/> : <Home />}
      </div>
    </div>
  );
}

export default App;
