import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate()
    // (navigate authors page)
    function Authors(){ 
        navigate("/Authors")
    }
    return ( 
        <div>
            <h1>Welcome Home Page</h1>
            <p>This is home page</p>
            {/* <button onClick={Authors}
                onMouseOver={(e) => (e.target.style.color = 'Brown')}
                onMouseOut={(e) => (e.target.style.color = 'White')}
            >Author Details</button> */}
        </div>
     );
}

export default Home;