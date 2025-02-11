import React from "react";
import HolidayList from "./components/HolidayList";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-2xl font-bold text-center mb-4">Holiday List</h1>
            <HolidayList />
        </div>
    );
}

export default App;
