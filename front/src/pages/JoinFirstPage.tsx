import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';

export function JoinFirstPage() {
  return (
    <div className="grayBackground">
      <div className="insideBox">
        <p className="title">JOIN TIFY</p>
        <div className="loginBox">
          <div className="processTab">
            <div className="processBox">
              <p className="text-primary processtext">이메일 인증</p>
              <img src={coloredCheckIcon} className="checkIcon" />
            </div>
            <div>
              <hr className="line" />
            </div>
            <div className="processBox">
              <p className="text-[#E0E0E0] processtext">회원정보 입력</p>
              <img src={checkIcon} className="checkIcon" />
            </div>
            <div>
              <hr className="line" />
            </div>
            <div className="processBox">
              <p className="text-[#E0E0E0] processtext">가입 완료</p>
              <img src={checkIcon} className="checkIcon" />
            </div>
          </div>
          <div className="emailBox">
            <p className="m-1">이메일</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
            </form>
            <button type="submit" className="loginButton font-bold">
              이메일 인증 요청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
