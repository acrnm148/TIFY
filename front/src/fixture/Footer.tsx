import { NavLink } from "react-router-dom";
import logo from "../assets/logoFooter.svg"
import '../css/footer.styles.css'
import logo2 from "../assets/logoFooter2.svg"

export function Footer() {
  return (
    <nav className="navbar-footer">
      <div className="footer-left">
      <NavLink to=""> 
        <img src={logo} className="logo" alt="Tify logo footer"/>
        </NavLink>
        <div className="company-info">
          <p>주식회사 88라이징</p>
          <p>대표이사 : 강기한</p>
          <p>주소 : 제주특별자치도 제주시</p>
          <p>첨단로 8 8층(88라이징)</p>
          <p>사업자등록번호 : 142-12-32538 </p>
          <p>-</p>
          <p>이메일 : pos04118@gmail.com </p>
          <p>고객센터 : 2488-6488 (평일 5:00 ~ 15:00)</p>
    
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-navigation">
          <p className="footer-title">Navigation</p>
          <div className="footer-navigation-row">
            <div className="footer-navigation">
              <NavLink to="/gifthub">gifthub</NavLink>
              <NavLink to="/friends">친구찾기</NavLink>
              <NavLink to="/thanks">감사하기</NavLink>
              <NavLink to="/wish">위시만들기</NavLink>
              <NavLink to="/wish">위시확인</NavLink>
            </div>
            <div className="footer-navigation">
              <NavLink to="/">제휴문의</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
              <NavLink to="/ask">문의하기</NavLink>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <p className="footer-title">Legal</p>
          <div className="footer-legal footer-legal-content">
            <NavLink to="">이용약관</NavLink>
            <NavLink to="">개인정보취급방침</NavLink>
            <NavLink to="">취소 및 환불정책</NavLink>
          </div>
        </div>
        
      </div>

      <div>
        <img src={logo2} alt="footer logo2" />
      </div>
      
    </nav>
  );
}
