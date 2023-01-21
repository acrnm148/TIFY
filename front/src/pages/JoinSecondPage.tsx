import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import defaultProfile from '../assets/iconDefaultProfile.svg';

export function JoinSecondPage() {
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
              <p className="text-[#E0E0E0] processtext">가입 완료</p>
              <img src={checkIcon} className="checkIcon" />
            </div>
          </div>
          <img src={defaultProfile} className="mx-auto" />
          <div className="emailBox">
            <p className="m-1">이메일</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                disabled
                placeholder={'name@example.com'}
              />
            </form>
            <p className="m-1">이름</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
            </form>
            <p className="m-1">닉네임</p>
            <form className="buttonForm">
              <input type="text" className="inputBox" id="emailForm" />
              <button className="formSideButton">중복확인</button>
            </form>
            <p className="m-1">비밀번호</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                placeholder={'영문 소문자, 숫자, 특수문자를 포함한 8~12자리'}
              />
            </form>
            <p className="m-1">비밀번호 확인</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
            </form>
            <p className="m-1">생년월일</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
              <input type="text" className="inputBox" id="emailForm" />
            </form>
            <p className="m-1">연락처</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                placeholder={'000 - 0000 - 0000'}
              />
            </form>
            <p className="m-1">주소</p>
            <form className="buttonForm">
              <input type="text" className="inputBox" id="emailForm" />
              <button className="formSideButton">주소찾기</button>
            </form>
            <p className="m-1">상세주소</p>
            <form className="emailForm">
              <input type="text" className="inputBox" id="emailForm" />
            </form>
            <button type="submit" className="loginButton font-bold">
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
