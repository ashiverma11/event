import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendanceTable() {

  const [records, setRecords] = useState([]);

  const loadAttendance = async () => {

    const res = await axios.get(
      "http://localhost:3000/attendance"
    );

    setRecords(res.data);

  };

  useEffect(() => {

    loadAttendance();

    const interval = setInterval(() => {
      loadAttendance();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>

      <h2>Live Attendance</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Ticket ID</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {records.map((item) => (

            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.ticketId}</td>
              <td>{item.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AttendanceTable;