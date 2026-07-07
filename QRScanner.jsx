import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

function QRScanner() {

  const [mode, setMode] = useState("checkin");
  const [ticketInfo, setTicketInfo] = useState(null);
  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      }
    );

    scanner.render(

      async (decodedText) => {

        console.log("Scanned QR:", decodedText);

        try {

          const apiUrl =
            mode === "checkin"
              ? "http:// 10.113.219.223:3000/checkin"
              : "http:// 10.113.219.223:3000/checkout";

          const response = await axios.post(
            apiUrl,
            {
              ticketId: decodedText,
            }
          );
          console.log("API Response:", response.data);
          setTicketInfo(response.data);
          alert(
            `${response.data.message}\n\n` +
            `Name: ${response.data.name || ""}\n` +
            `Ticket ID: ${response.data.ticketId || decodedText}\n` +
            `Event: ${response.data.event || ""}`
          );

        } catch (error) {

          console.log(error);

          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert("Server Error");
          }

        }

      },

      (error) => {
        // Ignore scan errors
      }

    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, [mode]);

 return (
  <div style={{ textAlign: "center" }}>

    <h1>QR Scanner</h1>

    <h3>Select Mode</h3>

    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
    >
      <option value="checkin">Check In</option>
      <option value="checkout">Check Out</option>
    </select>

    <br />
    <br />

    <div id="reader"></div>

    {ticketInfo && (
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "20px auto"
        }}
      >
        <h2>Attendee Details</h2>

        <p><strong>Name:</strong> {ticketInfo.name}</p>

        <p><strong>Email:</strong> {ticketInfo.email}</p>

        <p><strong>Event:</strong> {ticketInfo.event}</p>

        <p><strong>Ticket ID:</strong> {ticketInfo.ticketId}</p>

        <p><strong>Status:</strong> {ticketInfo.message}</p>
      </div>
    )}

  </div>
);
}

export default QRScanner;