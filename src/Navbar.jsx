import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
    return ( 
        <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: '#48A6A7',
            color: 'white',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Navigation Links */}
            <Link
              to="/"
              style={{
                color: 'White',
                textDecoration: 'none',
                fontSize: '1em',
                transition: 'color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.color = 'Brown')}
              onMouseOut={(e) => (e.target.style.color = 'White')}
            >
              Home
            </Link>
            <Link
              to="/authors"
              style={{
                color: 'White',
                textDecoration: 'none',
                fontSize: '1em',
                transition: 'color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.color = 'Brown')}
              onMouseOut={(e) => (e.target.style.color = 'White')}
            >
                Authors
            </Link>
            <Link
             to="/posts"
             style={{
              color: 'White',
                textDecoration: 'none',
                fontSize: '1em',
                transition: 'color 0.3s',
             }}
             onMouseOver={(e) => (e.target.style.color = 'Brown')}
              onMouseOut={(e) => (e.target.style.color = 'White')}
            >
              Posts
            </Link>
          </div>
        </div>

        <div
          style={{
            marginTop: '10px',
            padding: '10px',
          }}
        >
          
        </div>
      </div>
    
     );
}

export default Navbar;