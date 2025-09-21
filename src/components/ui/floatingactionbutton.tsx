// src/components/FloatingActionButton.jsx
import React from 'react';
import { Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton = () => {
  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
  };

  const iconStyle = {
    width: '30px',
    height: '30px',
  };

  return (
    <Link to='/support' title='Customer Support'>
      <div style={buttonStyle}>
        <Headphones style={iconStyle} />
      </div>
    </Link>
  );
};

export default FloatingActionButton;