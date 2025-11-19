import React from "react";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <p>Your content goes here...</p>

      {/* Dummy scroll data */}
      {[...Array(40)].map((_, i) => (
        <p key={i}>Scrollable Content Line {i + 1}</p>
      ))}
    </div>
  );
}

export default Dashboard;
