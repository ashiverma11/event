import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [count, setCount] = useState(0);

   useEffect(() => {

    const interval = setInterval(async () => {

        try {

            const res = await axios.get(
                "http://10.113.219.223:3000/crowd-count"
            );

            setCount(res.data.crowdCount);

        } catch (error) {

            console.log("Crowd Count Error:", error);

        }

    }, 2000);

    return () => clearInterval(interval);

}, []);
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Live Crowd Count</h1>
            <h2>{count}</h2>
        </div>
    );
}

export default Dashboard;