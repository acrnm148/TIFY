import '../css/login.styles.css';
import '../css/join.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import defaultProfile from '../assets/iconDefaultProfile.svg';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Login } from '../modules/Auth/LogIn';
import { setRefreshToken } from '../modules/Auth/RefreshtokenLocal';
import { SET_TOKEN, SET_USERID, SET_USEREMAIL } from '../store/Auth';
import { useDispatch } from 'react-redux';
import { TypeH1 } from 'react-bootstrap-icons';

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

  const [password, setPassword] = useState<string>('');
  const [passVal, setPassVal] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [addr1, setAddr1] = useState<string>('');
  const [addr2, setAddr2] = useState<string>('');
  const [birthYear, setBirthyear] = useState<string>();
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [birth, setBirth] = useState<string>();
  const [tel1, setTel1] = useState<string>('');
  const [tel2, setTel2] = useState<string>('');
  const [tel3, setTel3] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const location = useLocation();
  const state = location.state as { emailData: string };
  const userid = state.emailData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickDubCheck, setNickDubCheck] = useState<boolean>(false);

  const [imgUrlS3, setImgUrlS3] = useState<string>(
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/5e1dc3dc-12c3-4363-8e91-8676c44f122b.png',
  );
  // photo
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImageButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  function GoJoin3() {
    navigate('/join3', {
      state: {
        username: username,
      },
    });
  }

  function telCehck() {
    let htel = /^(?=.*[0-9]{2,3})/;
    let mtel = /^(?=.*[0-9]{3,4})/;
    let etel = /^(?=.*[0-9]{4,4})/;

    if (htel.test(tel1) && mtel.test(tel2) && etel.test(tel3)) {
      return '';
    }
    return '* 유효하지 않은 연락처입니다.';
  }

  function birthCheck() {
    if (
      Date.parse(`${birthYear}-${birthMonth}-${birthDay}`) &&
      birthYear &&
      birthMonth &&
      birthDay
    ) {
      return '';
    }
    return '* 유효하지 않은 날짜입니다.';
  }

  function pwCheck1(pw: string) {
    let alpah = /^(?=.*[a-zA-Z])/;

    if (!alpah.test(password)) {
      return '* 영어가 포함되어 있지 않습니다.';
    }
    return '';
  }

  function pwCheck2(pw: string) {
    let nume = /^(?=.*\d)/;

    if (!nume.test(password)) {
      return '* 숫자가 포함되어 있지 않습니다.';
    }
    return '';
  }

  function pwCheck3(pw: string) {
    let special = /^(?=.*[!@#\$%\^&\*])/;

    if (!special.test(password)) {
      return '* 특수문자가 포함되어 있지 않습니다.';
    }
    return '';
  }

  function pwCheck4(pw: string) {
    let len = /^(?=.{8,12})/;

    if (pw.length < 8) {
      return '* 길이가 8자 미만입니다.';
    } else if (pw.length > 12) {
      return '* 길이가 12자 초과입니다.';
    }
    return '';
  }

  function pwCheck5(pw: string) {
    let pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;

    if (!pwdCheck.test(password)) {
      return '* 유효하지 않은 비밀번호 입니다.';
    }
    return '';
  }

  function CheckValid() {
    if (username == '') {
      alert('이름을 입력하세요.');
      return false;
    }

    // 닉네임 중복 여부 확인\
    if (!nickDubCheck) {
      alert('닉네임 중복 확인을 해주세요.');
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

    if (password !== confirmPassword) {
      alert('비밀번호가 다릅니다.');
      return false;
    }

    var reg = /^[0-9]+/g; //숫자만 입력하는 정규식

    if (birthYear == undefined) {
      alert('태어난 연도를 입력해주세요.');
      return false;
    }

    if (birthYear.length < 4 || 4 < birthYear.length) {
      alert('태어난 연도를 4자리로 입력해주세요.');
      return false;
    }

    if (birthMonth == '') {
      alert('태어난 월을 입력해주세요.');
      return false;
    }
    if (birthMonth.length < 2 || 2 < birthMonth.length) {
      alert('몇 월인지를 2자리로 입력해주세요.');
      return false;
    }
    if (birthDay == '') {
      alert('태어난 날짜를 입력해주세요.');
      return false;
    }

    if (2 < birthDay.length) {
      alert('몇 일인지를 2자리로 입력해주세요.');
      return false;
    }

    if (birthDay.length < 2) {
      alert('몇 일인지를 2자리로 입력해주세요.');
      return false;
    }

    console.log(birthYear, birthMonth, birthDay);
    console.log(typeof birthYear, typeof birthMonth, typeof birthDay);
    // console.log(
    //   !reg.test(birthYear),
    //   !reg.test(birthMonth),
    //   !reg.test(birthDay),
    // );
    // if (reg.test(birthYear)) {
    //   alert('1.');
    // }
    // if (reg.test(birthMonth)) {
    //   alert('2.');
    // }
    // if (reg.test(birthDay)) {
    //   alert('3.');
    // }
    // if (Number.isNaN(birthMD) || Number.isNaN(birthYear)) {
    //   alert('생년월일은 숫자만 입력할 수 있습니다.');
    //   return false;
    // }

    if (tel1 == '' || tel2 == '' || tel3 == '') {
      alert('전화번호를 입력해주세요.');
      return false;
    }

    if (3 < tel1.length) {
      alert('전화번호 첫 자리가 너무 길어요.');
      return false;
    }
    if (4 < tel2.length) {
      alert('전화번호 두 번째 자리가 너무 길어요.');
      return false;
    }
    if (4 < tel3.length) {
      alert('전화번호 세 번째 자리가 너무 길어요.');
      return false;
    }

    // if (!reg.test(tel1) || !reg.test(tel2) || !reg.test(tel3)) {
    //   alert('전화번호는 숫자만 입력할 수 있습니다.');
    //   return false;
    // }
    // console.log(!Number.isNaN(tel1));
    // console.log(!Number.isNaN(tel2));
    // console.log(!Number.isNaN(tel3));
    // console.log(
    //   !Number.isNaN(tel1) && !Number.isNaN(tel2) && !Number.isNaN(tel3),
    // );
    // if (Number.isNaN(tel1) || Number.isNaN(tel2) || isNaN(tel3)) {
    //   alert('전화번호는 숫자만 입력할 수 있습니다.');
    //   return false;
    // }

    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const birthMD = birthMonth + birthDay;
    const tel = tel1 + '-' + tel2 + '-' + tel3;
    // console.log(tel);

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
          birth: birthMD,
          tel,
          email: userid,
          username,
          nickname,
          profile_img: imgUrlS3,
        });
        return await axios
          .post(
            'https://i8e208.p.ssafy.io/api/account/signin',
            {
              userid,
              password,
              addr1,
              addr2,
              birthYear,
              birth: birthMD,
              tel,
              email: userid,
              username,
              nickname,
              profile_img: imgUrlS3,
            },
            config,
          )
          .then((res) => {
            console.log(res, '회원가입 api 시도 성공!');
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
                  GoJoin3();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
      } catch (err) {
        console.log(err);
        console.log('Errrrrrr');
      }
    }
  };

  // if (isLoading) {
  //   return <p>Confirming email...</p>;
  // }

  function CheckNickname(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (nickname == '') {
      alert('닉네임을 입력하세요.');
      return false;
    }
    const nicknameCheck = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    if (!nicknameCheck.test(nickname)) {
      alert('닉네임은 영어/한글만 가능합니다.');
      return false;
    }

    console.log(nickname.length);
    if (nickname.length < 2 || nickname.length > 10) {
      alert('닉네임은 2~10글자로 구성해주셔야 합니다.');
      return false;
    }

    axios
      .get('https://i8e208.p.ssafy.io/api/dupCheck', {
        params: {
          nickname,
        },
      })
      .then((e) => {
        console.log(e.data);
        console.log('닉네임 확인 완료');
        console.log(e);
        if (e.data == 'Y') {
          alert(`이미 존재하는 닉네임입니다. 😅`);
          setNickDubCheck(false);
          return;
        }
        alert('You can do it! 👍');
        setNickDubCheck(true);
      })
      .catch((err) => {
        alert(`You can't do it! 😅`);
        console.log('error', err);
      });
    console.log('abc');
  }

  const formData = new FormData();
  const handleChangeFile = (event: any) => {
    // if (event.target.files[0]) {
    //   formData.append('file', event.target.files[0]); // 파일 상태 업데이트
    // }
    // imgFile 을 보내서 S3에 저장된 url받기
    const sizeLimit = 300 * 10000;
    // 300만 byte 넘으면 경고문구 출력
    if (event.target.files[0].size > sizeLimit) {
      alert('사진 크기가 3MB를 넘을 수 없습니다.');
    } else {
      console.log('3mb가 아님');
      if (event.target.files[0]) {
        formData.append('file', event.target.files[0]); // 파일 상태 업데이트

        const getImgUrl = async () => {
          const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
          await axios
            .post(API_URL, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((con) => {
              console.log('이미지주소불러오기 성공', con.data);
              setImgUrlS3(con.data);
            })
            .catch((err) => {
              console.log('이미지주소불러오기 실패', err);
            });
        };
        getImgUrl();
      }
    }
  };

  return (
    <div className="grayBackground">
      <div className="insideBox">
        <p className="title">JOIN TIFY</p>
        <div className="loginBox">
          <div className="processTab">
            <div className="processBox">
              <p className="text-[#fe3360] processtext">이메일 인증</p>
              <img src={coloredCheckIcon} className="checkIcon" />
            </div>
            <div>
              <hr className="line" />
            </div>
            <div className="processBox">
              <p className="text-[#fe3360] processtext">회원정보 입력</p>
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
          <div
            className="img-div"
            style={{ border: 'none', backgroundImage: `url("${imgUrlS3}")` }}
            onClick={onUploadImageButtonClick}
          >
            <input
              type="file"
              name="imgFile"
              accept="image/*"
              ref={inputRef}
              id="imgFile"
              onChange={handleChangeFile}
              style={{ display: 'none' }}
            />
            <img
              src="https://tifyimage.s3.ap-northeast-2.amazonaws.com/54a2e5c2-1c5c-4a77-9aa0-80d7dfd8da4a.png"
              className="profile-img"
            />
          </div>
          <div className="emailBox" style={{ marginTop: '40px' }}>
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
              onChange={(e) => setUsername(e.target.value)}
              maxLength={6}
              className={`${
                username ? 'inputBox checkedNickname' : 'inputBox'
              }`}
            />
            <p className="m-1">닉네임</p>
            <div className="nickname-div">
              <div
                className={`nickname-box 
                ${nickDubCheck ? 'checkedNickname' : ''}
                `}
              >
                <input
                  type="text"
                  maxLength={10}
                  // className={`${nickDubCheck ? 'checkedNickname' : ''}`}
                  placeholder="2~10자리 한글/영어"
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setNickDubCheck(false);
                  }}
                />
              </div>
              <button className="formSideButton" onClick={CheckNickname}>
                중복 확인
              </button>
            </div>
            <span className="m-1">비밀번호</span>
            <form className="emailForm">
              <input
                type="password"
                maxLength={12}
                placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  !pwCheck5(password) ? 'inputBox checkedNickname' : 'inputBox'
                }`}
              />
              <div
                style={{
                  position: 'relative',
                  left: '10%',
                  marginBottom: '5%',
                }}
              >
                <h1 style={{ color: 'red' }}>{pwCheck1(password)}</h1>
                <h1 style={{ color: 'red' }}>{pwCheck2(password)}</h1>
                <h1 style={{ color: 'red' }}>{pwCheck3(password)}</h1>
                <h1 style={{ color: 'red' }}>{pwCheck4(password)}</h1>
                <h1 style={{ color: 'red' }}>{pwCheck5(password)}</h1>
              </div>
            </form>
            <span className="m-1">비밀번호 확인</span>
            <form className="emailForm">
              <input
                type="password"
                className={`${
                  password == confirmPassword && confirmPassword != ''
                    ? 'inputBox checkedNickname'
                    : 'inputBox'
                }`}
                maxLength={12}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                style={{
                  position: 'relative',
                  left: '10%',
                  marginBottom: '5%',
                }}
              >
                {password != confirmPassword ? (
                  <h1 style={{ color: 'red' }}>
                    비밀번호가 일치하지 않습니다.
                  </h1>
                ) : null}
              </div>
            </form>
            <p className="m-1">생년월일</p>
            <form className="emailForm">
              <div
                className={`${
                  birthCheck().length < 1
                    ? 'mini-input-container checkedNickname'
                    : 'mini-input-container'
                }`}
              >
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="2000"
                  maxLength={4}
                  onChange={(e) => setBirthyear(e.target.value)}
                />
                <span>년</span>
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="10"
                  min="1"
                  max="12"
                  onChange={(e) => setBirthMonth(e.target.value)}
                />
                <span>월</span>
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="10"
                  maxLength={2}
                  onChange={(e) => setBirthDay(e.target.value)}
                />
                <span>일</span>
              </div>
              {/* { (Date.parse(`${birthYear}-${birthMonth}-${birthDay}`) 
                  && birthYear && birthMonth && birthDay) ? 
                  null :
                  (<h1 style={{color:"red"}}>유효하지 않은 날짜입니다.</h1>)
                } */}
              <div
                style={{
                  position: 'relative',
                  left: '10%',
                  marginBottom: '5%',
                }}
              >
                <h1 style={{ color: 'red' }}>{birthCheck()}</h1>
              </div>
            </form>
            <p className="m-1">연락처</p>
            <form className="emailForm">
              <div
                className={`${
                  telCehck().length < 1
                    ? 'mini-input-container checkedNickname'
                    : 'mini-input-container'
                }`}
              >
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="010"
                  maxLength={3}
                  onChange={(e) => setTel1(e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="8888"
                  maxLength={4}
                  onChange={(e) => setTel2(e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  className="mini-input-box"
                  placeholder="8888"
                  maxLength={4}
                  onChange={(e) => setTel3(e.target.value)}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  left: '10%',
                  marginBottom: '5%',
                }}
              >
                <h1 style={{ color: 'red' }}>{telCehck()}</h1>
              </div>
            </form>

            <form className="emailForm" onSubmit={handleSubmit} method="get">
              <button
                type="submit"
                className={`${
                  telCehck().length < 1 &&
                  birthCheck().length < 1 &&
                  password == confirmPassword &&
                  pwCheck5(password).length < 1 &&
                  nickDubCheck &&
                  username.length > 0
                    ? 'loginButton font-bold'
                    : 'loginButton-d font-bold'
                }`}
                disabled={
                  !(
                    telCehck().length < 1 &&
                    birthCheck().length < 1 &&
                    password === confirmPassword &&
                    pwCheck5(password).length < 1 &&
                    nickDubCheck &&
                    username.length > 0
                  )
                }
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
