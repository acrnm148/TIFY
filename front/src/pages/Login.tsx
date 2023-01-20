import '../css/login.css';

export function Login() {
  return (
    <div className="grayBackground">
      <div className="insideBox">
        <p className="title">LOGIN to TIFY</p>
        <div className="loginBox">
          <div className="emailBox">
            <p>이메일</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
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
            <button className="findPassword">Forgot password?</button>
          </div>
        </div>
      </div>
    </div>
  );
}
