import "./App.css";
import QRScanner from "./components/QRScanner";
import Dashboard from "./components/Dashboard";
import AttendanceTable from "./components/AttendanceTable";

function App() {
  return (
    <div className="app">

      <Dashboard />

      <div className="scanner-section">
        <QRScanner />
      </div>

      <div className="attendance-section">
        <AttendanceTable />
      </div>

    </div>
  );
}

export default App;