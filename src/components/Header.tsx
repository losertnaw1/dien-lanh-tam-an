import React from 'react';
import './Header.css';
import logo from '../assets/tam-an-logo.svg'; // Sử dụng logo Tâm An

interface HeaderProps {
  // You can add props here if needed
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo" />
          <h1 className="company-name">Điện Lạnh Tâm An</h1>
        </div>
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#home">Trang Chủ</a></li>
            <li className="nav-item"><a href="#about">Giới Thiệu</a></li>
            <li className="nav-item"><a href="#services">Dịch Vụ</a></li>
            <li className="nav-item"><a href="#products">Sản Phẩm</a></li>
            <li className="nav-item"><a href="#contact">Liên Hệ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
