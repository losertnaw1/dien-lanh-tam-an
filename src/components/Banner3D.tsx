import React, { useEffect, useRef } from 'react';
import './Banner3D.css';
import airConditioner from '../assets/appliances/air-conditioner.svg';
import refrigerator from '../assets/appliances/refrigerator.svg';
import washingMachine from '../assets/appliances/washing-machine.svg';
import microwave from '../assets/appliances/microwave.svg';

const Banner3D: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bannerRef.current) return;

      const banner = bannerRef.current;
      const rect = banner.getBoundingClientRect();

      // Tính toán vị trí chuột tương đối so với banner
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Tính toán tỷ lệ vị trí chuột (0-1)
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      // Tính toán góc nghiêng dựa trên vị trí chuột
      const maxTilt = 15; // Góc nghiêng tối đa (độ)
      const tiltX = maxTilt * (0.5 - yPercent);
      const tiltY = maxTilt * (xPercent - 0.5);

      // Áp dụng hiệu ứng 3D cho các thiết bị
      const appliances = banner.querySelectorAll('.appliance');
      appliances.forEach((appliance, index) => {
        const zValue = (index + 1) * 30; // Giá trị z khác nhau cho mỗi thiết bị
        const translateZ = 50 + zValue;
        const rotateX = tiltX / 2;
        const rotateY = tiltY / 2;

        (appliance as HTMLElement).style.transform =
          `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      // Áp dụng hiệu ứng nghiêng cho banner
      banner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!bannerRef.current) return;

      // Reset hiệu ứng khi chuột rời khỏi banner
      const banner = bannerRef.current;
      banner.style.transform = 'rotateX(0deg) rotateY(0deg)';

      const appliances = banner.querySelectorAll('.appliance');
      appliances.forEach((appliance) => {
        (appliance as HTMLElement).style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
      });
    };

    const banner = bannerRef.current;
    if (banner) {
      banner.addEventListener('mousemove', handleMouseMove);
      banner.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (banner) {
        banner.removeEventListener('mousemove', handleMouseMove);
        banner.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="banner3d-container">
      <div className="banner3d" ref={bannerRef}>
        <div className="banner-content">
          <h2>Điện Lạnh Tâm An</h2>
          <p>Chuyên cung cấp dịch vụ sửa chữa, bảo trì và lắp đặt điều hòa, tủ lạnh và các thiết bị điện lạnh</p>
          <a href="#contact" className="cta-button">Liên hệ ngay</a>
        </div>
        <div className="appliances-container">
          <img src={airConditioner} alt="Điều hòa" className="appliance air-conditioner" />
          <img src={refrigerator} alt="Tủ lạnh" className="appliance refrigerator" />
          <img src={washingMachine} alt="Máy giặt" className="appliance washing-machine" />
          <img src={microwave} alt="Lò vi sóng" className="appliance microwave" />
        </div>
      </div>
    </div>
  );
};

export default Banner3D;
