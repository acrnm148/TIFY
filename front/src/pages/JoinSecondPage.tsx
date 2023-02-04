import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import defaultProfile from '../assets/iconDefaultProfile.svg';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Login } from '../modules/Auth/LogIn';
import { setRefreshToken } from '../modules/Auth/Cookie';
import { SET_TOKEN, SET_USERID, SET_USEREMAIL } from '../store/Auth';
import { useDispatch } from 'react-redux';

export function JoinSecondPage() {
  // const [userid, setUserid] = useState('');
  // 테스트 용도
  // const [password, setPassword] = useState('abc123!!');
  // const [confirmPassword, setConfirmPassword] = useState('abc123!!');
  // const [addr1, setAddr1] = useState('부산시 해운대구');
  // const [addr2, setAddr2] = useState('104동 402호');
  // const [birthYear, setBirthyear] = useState('1999');
  // const [birth, setBirth] = useState('0923');
  // const [tel, setTel] = useState('010-1234-5667');
  // const [username, setUsername] = useState('강수나');
  // const [nickname, setNickname] = useState('수나캉');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [birthYear, setBirthyear] = useState('');
  const [birth, setBirth] = useState('');
  const [tel, setTel] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const state = location.state as { emailData: string };
  const userid = state.emailData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function GoJoin3() {
    navigate('/join3', {
      state: {
        username: username,
      },
    });
  }

  function CheckValid() {
    if (username == '') {
      alert('이름을 입력하세요.');
      return false;
    }

    if (nickname == '') {
      alert('닉네임을 입력하세요.');
      return false;
    }
    if (password == '') {
      alert('비밀번호를 입력하세요.');
      return false;
    }

    //비밀번호 영문자+숫자+특수조합(8~12자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;

    if (!pwdCheck.test(password)) {
      alert(
        '비밀번호는 영문자+숫자+특수문자 조합으로 8~12자리 사용해야 합니다.',
      );
      return false;
    }

    var reg = /^[0-9]+/g; //숫자만 입력하는 정규식

    if (tel == '') {
      alert('전화번호를 입력해주세요.');
      return true;
    }

    if (birthYear == '') {
      alert('태어난 연도를 입력해주세요.');
      return true;
    }

    if (birth == '') {
      alert('태어난 날짜를 입력해주세요.');
      return true;
    }

    if (!reg.test(tel)) {
      alert('전화번호는 숫자만 입력할 수 있습니다.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 다릅니다.');
      return false;
    }
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (CheckValid()) {
      try {
        setIsLoading(true);
        console.log(userid);
        const config: object = {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        };
        console.log({
          userid,
          password,
          addr1,
          addr2,
          birthYear,
          birth,
          tel,
          email: userid,
          username,
          nickname,
        });
        await axios
          .post(
            'https://i8e208.p.ssafy.io/api/account/signin',
            {
              userid,
              password,
              addr1,
              addr2,
              birthYear,
              birth,
              tel,
              email: userid,
              username,
              nickname,
            },
            config,
          )
          .then((res) => {
            console.log(res, '회원가입 성공!');
            Login(userid, password)
              .then((response) => {
                if (response === '로그인 실패!') {
                  alert(
                    '미등록 회원이거나 잘못된 아이디/비밀번호를 입력하셨습니다.',
                  );
                } else {
                  console.log('리프레쉬토큰 가자');
                  setRefreshToken(response.refresh_token);
                  dispatch(SET_TOKEN(response.access_token));
                  dispatch(SET_USERID(response.user_id));
                  dispatch(SET_USEREMAIL(response.user_email));

                  console.log('로그인 성공!!');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        GoJoin3();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError('Error confirming email. Please try again later.');
        console.log(err);
        console.log('Errrrrrr');
      }
    }
  };

  if (isLoading) {
    return <p>Confirming email...</p>;
  }

  function CheckNickname(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    axios
      .get('https://i8e208.p.ssafy.io/api/dupCheck', {
        params: {
          nickname,
        },
      })
      .then((e) => {
        console.log('닉네임 확인 완료');
        console.log(e);
      })
      .catch((err) => {
        console.log('error', err);
      });
    console.log('abc');
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
                disabled
                placeholder={userid}
              />
            </form>
            <p className="m-1">이름</p>
            <input
              type="text"
              className="inputBox"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="m-1">닉네임</p>
            <form className="zorm">
              <input
                type="text"
                className="inputBox"
                placeholder="2~10자리 한글/영어"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="formSideButton" onClick={CheckNickname}>
                중복확인
              </button>
            </form>
            <p className="m-1">비밀번호</p>
            <form className="emailForm">
              <input
                type="password"
                className="inputBox"
                placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <p className="m-1">비밀번호 확인</p>
            <form className="emailForm">
              <input
                type="password"
                className="inputBox"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </form>
            <p className="m-1">생년월일</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                placeholder="2000"
                onChange={(e) => setBirthyear(e.target.value)}
              />
              <input
                type="text"
                className="inputBox"
                placeholder="0101"
                onChange={(e) => setBirth(e.target.value)}
              />
            </form>
            <p className="m-1">연락처</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                // placeholder={'000 - 0000 - 0000'}
                onChange={(e) => setTel(e.target.value)}
              />
            </form>
            <form className="emailForm" onSubmit={handleSubmit} method="get">
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
