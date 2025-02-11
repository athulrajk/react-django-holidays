import { useEffect, useState } from "react";
import { getHolidays } from "../api";

function HolidayList() {
    const [holidays, setHolidays] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("US");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedHoliday, setSelectedHoliday] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getHolidays(selectedCountry, selectedYear);
            setHolidays(data);
        }
        fetchData();
    }, [selectedCountry, selectedYear]);

    // Filter holidays based on search term
    const filteredHolidays = holidays.filter(holiday =>
        holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Holidays</h1>

            {/* Country & Year Selection */}
            <div className="flex gap-2 mb-4">
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                </select>

                <input
                    type="number"
                    placeholder="Enter Year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border rounded"
                />

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search Holiday"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>

            {/* Holiday List */}
            <ul>
                {filteredHolidays.length > 0 ? (
                    filteredHolidays.map((holiday, index) => (
                        <li 
                            key={index} 
                            className="p-2 border-b cursor-pointer"
                            onClick={() => setSelectedHoliday(holiday)}
                        >
                            {holiday.name} - {holiday.date}
                        </li>
                    ))
                ) : (
                    <p>No holidays found.</p>
                )}
            </ul>

            {/* Holiday Detail Modal */}
            {selectedHoliday && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">{selectedHoliday.name}</h2>
                        <p><strong>Date:</strong> {selectedHoliday.date}</p>
                        <p><strong>Type:</strong> {selectedHoliday.type}</p>
                        <p><strong>Description:</strong> {selectedHoliday.description || "No description available."}</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setSelectedHoliday(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HolidayList;
