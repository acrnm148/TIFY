import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export function JoinThirdPage() {
  const location = useLocation();
  const state = location.state as { username: string };
  const username = state.username;

  const navigate = useNavigate();
  function GoGifthub() {
    navigate('/gifthub');
  }

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
            <p className="welcome">{username}님 환영합니다!</p>
            <button
              type="submit"
              className="loginButton font-bold"
              onClick={GoGifthub}
            >
              GiftHub 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
