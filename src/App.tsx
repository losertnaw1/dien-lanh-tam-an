import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ScrollAnimation from './components/ScrollAnimation'
import Hero3D from './components/three/Hero3D'
import AppliancesScene from './components/three/AppliancesScene'
import ServiceCards3D from './components/three/ServiceCards3D'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Hero 3D Section */}
        <section id="home">
          <Hero3D />
        </section>

        {/* Giới thiệu */}
        <section id="about" className="about-section">
          <div className="section-container">
            <ScrollAnimation>
              <h2>Giới Thiệu Về Chúng Tôi</h2>
            </ScrollAnimation>
            <div className="about-content">
              <ScrollAnimation delay={200}>
                <div className="about-text">
                  <p>Điện Lạnh Tâm An là đơn vị chuyên nghiệp trong lĩnh vực cung cấp dịch vụ sửa chữa, bảo trì và lắp đặt các thiết bị điện lạnh.</p>
                  <p>Với đội ngũ kỹ thuật viên lành nghề, chúng tôi cam kết mang đến cho khách hàng dịch vụ chất lượng cao với giá cả hợp lý.</p>
                  <ul className="about-features">
                    <li>Hơn 10 năm kinh nghiệm trong ngành</li>
                    <li>Đội ngũ kỹ thuật viên chuyên nghiệp</li>
                    <li>Phục vụ 24/7, kể cả ngày lễ</li>
                    <li>Bảo hành dài hạn</li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>
          <div className="about-image-container">
            <ScrollAnimation delay={400}>
              <div className="about-image">
                <AppliancesScene />
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Dịch vụ */}
        <section id="services" className="services-section">
          <div className="section-container">
            <ScrollAnimation>
              <h2>Dịch Vụ Của Chúng Tôi</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <ServiceCards3D />
            </ScrollAnimation>
          </div>
        </section>

        {/* Sản phẩm */}
        <section id="products" className="products-section">
          <div className="section-container">
            <ScrollAnimation>
              <h2>Sản Phẩm</h2>
            </ScrollAnimation>
            <div className="products-grid">
              <ScrollAnimation animation="fade-left" delay={100}>
                <div className="product-card">
                  <h3>Điều hòa dân dụng</h3>
                  <p>Các loại điều hòa chất lượng cao, tiết kiệm điện từ các thương hiệu nổi tiếng.</p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-left" delay={200}>
                <div className="product-card">
                  <h3>Tủ lạnh và tủ đông</h3>
                  <p>Các dòng tủ lạnh và tủ đông hiện đại, tiết kiệm năng lượng.</p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-right" delay={300}>
                <div className="product-card">
                  <h3>Máy lọc không khí</h3>
                  <p>Các sản phẩm lọc không khí chất lượng cao, loại bỏ bụi mịn và vi khuẩn.</p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-right" delay={400}>
                <div className="product-card">
                  <h3>Phụ kiện điện lạnh</h3>
                  <p>Các loại phụ kiện, linh kiện thay thế chính hãng cho các thiết bị điện lạnh.</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Liên hệ */}
        <section id="contact" className="contact-section">
          <div className="section-container">
            <ScrollAnimation>
              <h2>Liên Hệ Với Chúng Tôi</h2>
            </ScrollAnimation>
            <div className="contact-content">
              <ScrollAnimation animation="fade-right" delay={200}>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div className="contact-text">
                      <h3>Số điện thoại</h3>
                      <p>0123 456 789</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <div className="contact-text">
                      <h3>Email</h3>
                      <p>info@dienlanhtaman.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div className="contact-text">
                      <h3>Địa chỉ</h3>
                      <p>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-left" delay={300}>
                <div className="contact-form">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="Họ và tên" required />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <input type="tel" placeholder="Số điện thoại" required />
                    </div>
                    <div className="form-group">
                      <textarea placeholder="Nội dung" rows={4} required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Gửi yêu cầu</button>
                  </form>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <ScrollAnimation animation="fade-up" delay={100}>
            <div className="footer-logo">
              <h3>Điện Lạnh Tâm An</h3>
              <p>Chuyên nghiệp - Uy tín - Chất lượng</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={200}>
            <div className="footer-links">
              <h4>Liên kết nhanh</h4>
              <ul>
                <li><a href="#home">Trang chủ</a></li>
                <li><a href="#about">Giới thiệu</a></li>
                <li><a href="#services">Dịch vụ</a></li>
                <li><a href="#products">Sản phẩm</a></li>
                <li><a href="#contact">Liên hệ</a></li>
              </ul>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <div className="footer-contact">
              <h4>Thông tin liên hệ</h4>
              <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
              <p>Điện thoại: 0123 456 789</p>
              <p>Email: info@dienlanhtaman.com</p>
            </div>
          </ScrollAnimation>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Điện Lạnh Tâm An. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
