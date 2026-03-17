import React, { useState } from "react";

function Home() {

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <div>
      <h1>Welcome {user?.full_name}</h1>
      <p>Your Role is {user?.role}</p> 
      <p>Your Department is {user?.department}</p>
      <p>Your Roll number is {user?.roll_no}</p>
    </div>
  );
}

export default Home;