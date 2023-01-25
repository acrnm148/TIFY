import '../css/login.styles.css';
import iconGoogle from '../assets/iconGoogle.svg';
import iconKakao from '../assets/iconKakao.svg';

export function LoginPage() {
  return (
    <div className="grayBackground">
      <div className="login-inside-box">
        <p className="title">LOGIN to TIFY</p>
        <div className="loginBox">
          <div className="emailBox">
            <p>이메일</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                placeholder="name@example.com"
              />
            </form>
            <p>비밀번호</p>
            <form>
              <input type="text" className="inputBox" />
            </form>
            <label>
              <input type="checkbox" name="color" value="blue" /> 로그인 정보
              저장
            </label>
            <button type="submit" className="loginButton font-roboto font-bold">
              Login
            </button>
            <button className="findPassword font-bold">Forgot password?</button>
          </div>
        </div>
      </div>
      <div>
        <div className="cross-line-box">
          <div className="cross-line"></div>
          <span
            style={{
              margin: '10px',
              color: '#A1A3A2',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            OR
          </span>
          <div className="cross-line"></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="icon-box">
            <img src={iconGoogle} alt="" />
            <img src={iconKakao} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
