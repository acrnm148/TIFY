import axios from 'axios';
import { RootState } from '../../store/Auth';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../../css/mypage/MyInfo.styles.css';
import { fontSize } from '@mui/system';

export function MyInfo() {
  const [userId, setUserId] = useState(
    useSelector((state: RootState) => state.authToken.userId),
  );
  const [username, setUsername] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [nickDubCheck, setNickDubCheck] = useState<boolean>(false);
  //newpassword 필요
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [addr1, setAddr1] = useState<string>('');
  const [addr2, setAddr2] = useState<string>('');
  const [birthYear, setBirthyear] = useState<string>();
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [tel1, setTel1] = useState<string>('');
  const [tel2, setTel2] = useState<string>('');
  const [tel3, setTel3] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        console.log('닉네임 확인 완료');
        console.log(e);
        alert('You can do it! 👍');
        setNickDubCheck(true);
      })
      .catch((err) => {
        alert(`You can't do it! 😅`);
        console.log('error', err);
      });
    console.log('abc');
  }

  return (
    <div className="info-page">
      <div className="emailBox">
        <p
          className="infopage-title"
          // style={{ fontSize: '30px' }}
        >
          | 개인정보 관리
        </p>
        <p className="m-1">이메일</p>
        <form className="emailForm">
          <input
            type="text"
            className="inputBox"
            disabled
            placeholder={userId}
          />
        </form>
        <p className="m-1">이름</p>
        <input
          type="text"
          className="inputBox"
          // onChange={(e) => setUsername(e.target.value)}
          maxLength={6}
        />
        <p className="m-1">닉네임</p>
        <div
        // className={`nickname-box
        //       ${nickDubCheck ? 'checkedNickname' : ''}
        //       `}
        >
          <form className="">
            <input
              type="text"
              maxLength={10}
              className={` 
                ${nickDubCheck ? 'checkedNickname' : ''}
                `}
              placeholder="2~10자리 한글/영어"
              onChange={(e) => {
                setNickname(e.target.value);
                // setNickDubCheck(false);
              }}
            />
            <button className="formSideButton" onClick={CheckNickname}>
              중복확인
            </button>
          </form>
        </div>
        <span className="m-1">비밀번호</span>
        <form className="emailForm">
          <input
            type="password"
            className="inputBox"
            maxLength={12}
            placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <span className="m-1">비밀번호 확인</span>
        <form className="emailForm">
          <input
            type="password"
            className="inputBox"
            maxLength={12}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
        <p className="m-1">생년월일</p>
        <form className="emailForm">
          <div className="mini-input-container">
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
        </form>
        <p className="m-1">연락처</p>
        <form className="emailForm">
          <div className="mini-input-container">
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
        </form>

        <form className="emailForm" onSubmit={handleSubmit} method="get">
          <button type="submit" className="loginButton font-bold">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
