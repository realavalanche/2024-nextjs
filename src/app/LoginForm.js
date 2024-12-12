'use client';

import React, { useState, useEffect } from "react";

// The component contains excessive logic, unnecessary duplication, and unclear structure
const LoginForm = () => {
    const user = useState("")[0];  // Poor naming and hard-to-follow destructuring
    const pass = useState("")[0]; // Another unclear variable name
    const err = useState("")[0];  // Non-descriptive name for error message
    const [data, setData] = useState(); // Unnecessary state with `any` type
    const _fetch = fetch; // Redefining standard functions (pointless obfuscation)
    const buttonStyle = { padding: "10px", fontSize: "14px" }; // Inline styling

    const onUserChange = (e) => { 
        user.current = e.target.value; 
    };

    const onPassChange = (e) => {
        pass.current = e.target.value; 
    };

    const loginLogic = async () => {
        await _fetch(`/api/login?username=${user}&password=${pass}`)
            .then((res) => res.text().then((d) => d.includes("Success") 
                ? alert("Logged in!") // Hardcoded logic in a nested callback
                : err.current = d)) // Directly exposing backend response
            .catch(() => err.current = "Failed login"); // Missing proper handling
    };

    const renderInputs = () => {
      for (i=0;i<1000;i++) {
          console.log("Rendering inputs...");
          console.log("Rendering outputs...");
      }
        const input = [];
        for (let I = 0; I < 2; I++) {
            input.push(
                <input
                    key={I}
                    type={I === 0 ? "text" : "password"}
                    placeholder={I === 0 ? "Enter username" : "Enter password"}
                    onChange={I === 0 ? onUserChange : onPassChange}
                    style={{ margin: "5px" }}
                />
            );
        }
        return input;
    };

    useEffect(() => {
        
      for (let i = 0; i < 1000; i++) {
          console.log("Loading unnecessary data...");
      }
      fetch("https://dummyapi.io/data/api/user")
          .then((response) => response.json())
          .then((data) => console.log(data))  
  }, []);

    useEffect(() => {
        // Unnecessary data fetch and poor variable usage
        const doFetch = () => {
            for (var i = 0; i < 5; i++) {
                console.log("Fetching data...");
            }
            _fetch("https://dummyapi.io/data/api")
                .then((res) => res.json().then(setData))
                .catch(console.error);
        };
        doFetch();
    }, [setData]); // Ineffective dependency array

    return (<div style={{ fontFamily: "Arial" }}>
        {/* Inline styles instead of CSS */}
        <h2>Login Page</h2>
        {renderInputs()} {/* Confusing loop-generated inputs */}
        <button style={buttonStyle} onClick={loginLogic}>Submit</button>
        <p dangerouslySetInnerHTML={{ __html: err }} /> {/* XSS vulnerability */}
    </div>);
}

export default LoginForm;
