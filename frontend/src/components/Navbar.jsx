import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBoxOpen, FaProductHunt, FaWeightHanging, FaThinkPeaks } from 'react-icons/fa';
import { FaBoltLightning, FaPerson, FaPersonBooth, FaPersonHiking } from 'react-icons/fa6';
import '../styles/Navbar.css';
import useAuthStore from '../store/AuthStore';
import LoginPage from './LoginPage';
// import { FaUserCircle } from 'react-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuthStore();
  const navigate = useNavigate();
  const { role }=LoginPage();

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🌐 TradeBridge</div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" exact="true" onClick={closeMenu}><FaHome /> Home</NavLink></li>
        {!user && <li><NavLink to="/login" onClick={closeMenu}> <FaPersonHiking /> Login</NavLink></li>}


        {!user && (
          <>
            <li><NavLink to="/users" onClick={closeMenu}><FaPersonBooth /> Register</NavLink></li>
            {/* <li><NavLink to="/quote" onClick={closeMenu}>Get a Quote</NavLink></li> */}
            <li><NavLink to="/products" onClick={closeMenu}><FaBoxOpen /> Products</NavLink></li>
          </>
        )}

        {user?.role === 'IMPORTER' && (
          <>
            <li><NavLink to="/products" onClick={closeMenu}><FaBoxOpen /> Products</NavLink></li>
            <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
              <FaPerson /> Logout
            </button></li>
            <li><NavLink to="/my-orders" onClick={closeMenu}><FaProductHunt /> My Orders</NavLink></li>
          </>
        )}



        {user?.role === 'ADMIN' && (
          <>

            <li><NavLink to="/admin" onClick={closeMenu} className="text-blue-600 underline">
              <FaPerson /> Admin Dashboard
            </NavLink></li>

            <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
              <FaPerson /> Logout
            </button></li>
            
            </>
          )}

          {user?.role === 'EXPORTER' && (
            <>
              <li><NavLink to="/product-exporter" onClick={closeMenu} className="text-blue-600 underline">
                <FaWeightHanging /> My Products
              </NavLink></li>

              <li><NavLink to="/exporter/pending-orders" onClick={closeMenu}><FaBoltLightning /> Pending Orders</NavLink></li>

              <li><NavLink to="/exporter-dashboard" onClick={closeMenu}><FaThinkPeaks /> Dashboard</NavLink></li>

              <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
                <FaPerson /> Logout
              </button></li>
            </>
          )}
          
        {/* <li><NavLink to="/quote" onClick={closeMenu}>Get a Quote</NavLink></li> */}
        <li><NavLink to="/about" onClick={closeMenu}> <FaInfoCircle /> About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;