import Dashboard from "@/components/Dashboard";
import React, { useEffect, useState } from "react";

function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email") 
    const role = sessionStorage.getItem("role") 
    setUserData({ username, name, email, role });
  }, []);

  return (
    <>
    <section className="main">   
      <div>
      <Dashboard />
      </div>
      <div className="content-main flex justify-center items-center">
        <div className="profile-container flex flex-col">
            <h2>User Profile</h2>
            <div>
                <strong>Username:</strong> {userData.username}
            </div>
            <div>
                <strong>Name:</strong> {userData.name}
            </div>
            <div>
                <strong>Email:</strong> {userData.email}
            </div>
            <div>
                <strong>Role:</strong> {userData.role}
            </div>
        </div>
      </div>
      </section>
    </>
  );
}

export default Profile;
