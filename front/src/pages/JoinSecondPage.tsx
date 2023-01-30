import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import defaultProfile from '../assets/iconDefaultProfile.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function JoinSecondPage() {
  const [userid, setEmail] = useState('');
  const [password, setPassword] = useState('kangsuna0289!');
  const [confirmPassword, setConfirmPassword] = useState('kangsuna0289!');
  const [addr1, setAddr1] = useState('부산시 해운대구');
  const [addr2, setAddr2] = useState('104동 402호');
  const [birthYear, setBirthyear] = useState('1999');
  const [birth, setBirth] = useState('0923');
  const [gender, setGender] = useState('F');
  const [tel, setTel] = useState('010-1234-5667');
  const [username, setName] = useState('강수나');
  const [nickname, setNickname] = useState('수나캉');
  const [zipcode, setZipcode] = useState('12345');

  const [authToken, setAuthToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setEmail(query.get('email') || '');
    setAuthToken(query.get('authToken') || '');
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setIsLoading(true);
      console.log(userid);
      const config: object = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      };
      // console.log({
      //   userid,
      //   password,
      //   addr1,
      //   addr2,
      //   birthYear,
      //   birth,
      //   gender,
      //   tel,
      //   email: userid,
      //   username,
      //   nickname,
      //   zipcode,
      //   authToken,
      // });
      await axios
        .post(
          '/api/account/signin',
          {
            userid,
            password,
            addr1,
            addr2,
            birthYear,
            birth,
            gender,
            tel,
            email: userid,
            username,
            nickname,
            zipcode,
            authToken,
          },
          config,
        )
        .then((res) => {
          console.log(res);
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Error confirming email. Please try again later.');
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Confirming email...</p>;
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
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                placeholder="2~10자리 한글/영어"
              />
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
            <form className="emailForm" onSubmit={handleSubmit} method="get">
              <input type="text" className="inputBox" id="emailForm" />
              <button type="submit" className="loginButton font-bold">
                가입하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
