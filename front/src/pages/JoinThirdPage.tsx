import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';

export function JoinThirdPage() {
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
              <p className="text-primary processtext">회원정보 입력</p>
              <img src={coloredCheckIcon} className="checkIcon" />
            </div>
            <div>
              <hr className="line" />
            </div>
            <div className="processBox">
              <p className="text-primary processtext">가입 완료</p>
              <img src={coloredCheckIcon} className="checkIcon" />
            </div>
          </div>
          <div className="emailBox">
            <p className="welcome">김싸피님 환영합니다!</p>
            <button type="submit" className="loginButton font-bold">
              위시 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
