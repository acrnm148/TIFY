import axios from 'axios';
import { RootState } from '../../store/Auth';
import { useSelector } from 'react-redux';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import '../../css/mypage/myInfo.styles.css';
import Postcode from '../../components/Post';
import { useOutletContext } from 'react-router-dom';

type ChildType = {
  Setname: (arg0: any) => void;
  SetNickName: (arg0: any) => void;
};

export function MyInfo() {
  const [userId, setUserId] = useState(
    useSelector((state: RootState) => state.authToken.userEmail),
  );
  const [username, setUsername] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [nickDubCheck, setNickDubCheck] = useState<boolean>(true);
  //newpassword 필요
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [confirmPassword2, setConfirmPassword2] = useState<string>('');
  const [addr1, setAddr1] = useState<string>('');
  const [addr2, setAddr2] = useState<string>('');
  const [birthYear, setBirthyear] = useState<string>();
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [tel1, setTel1] = useState<string>('');
  const [tel2, setTel2] = useState<string>('');
  const [tel3, setTel3] = useState<string>('');
  const { Setname, SetNickName } = useOutletContext<ChildType>();

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

  const [enroll_company, setEnroll_company] = useState({
    address: '',
    zonecode: '',
  });
  const handleInput = (e: any) => {
    console.log(e);
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  function telCehck() {
    let htel = /^(?=.*[0-9]{2,3})/;
    let mtel = /^(?=.*[0-9]{3,4})/;
    let etel = /^(?=.*[0-9]{4,4})/;
    
    if (htel.test(tel1) && mtel.test(tel2) && etel.test(tel3)) {
      return "";
    }
    return "유효하지 않은 연락처입니다."
  }

  function birthCheck() {
    if (Date.parse(`${birthYear}-${birthMonth}-${birthDay}`) && birthYear && birthMonth && birthDay) {
      return ""
    }
    return "유효하지 않은 날짜입니다.";
  }

  function pwCheck1() {
    let alpah = /^(?=.*[a-zA-Z])/;

    if (!alpah.test(password2)) {
      return "영어가 포함되어 있지 않습니다.";
    }
    return "";
  }

  function pwCheck2() {
    let nume = /^(?=.*\d)/;

    if (!nume.test(password2)) {
      return "숫자가 포함되어 있지 않습니다.";
    }
    return "";
  }

  function pwCheck3() {
    let special = /^(?=.*[!@#\$%\^&\*])/;
  
    if (!special.test(password2)) {
      return "특수문자가 포함되어 있지 않습니다.";
    }
    return "";
  }

  function pwCheck4() {
    let len = /^(?=.{8,12})/;

    if (password2.length < 8 ) {
      return "길이가 8자 미만입니다."
    }
    else if (password2.length > 12) {
      return "길이가 12자 초과입니다."
    }
    return "";
  }

  function pwCheck5() {
    let pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;

    if (!pwdCheck.test(password2)) {
      return "유효하지 않은 비밀번호 입니다."
   }
   return "";
  }

  // 처음 유저값 불러오는 부분
  useEffect(() => {
    axios({
      url: 'https://i8e208.p.ssafy.io/api/account/userInfo',
      method: 'GET',
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res, 'res입니다.');
        setAddr1(res.data.addr1);
        setAddr2(res.data.addr2);
        setBirthyear(res.data.birthYear);
        // console.log(res.data.birth);
        const birthMonth = res.data.birth.substr(0, 2);
        const birthDay = res.data.birth.substr(2, 2);
        setBirthMonth(birthMonth);
        setBirthDay(birthDay);
        setNickname(res.data.nickname);
        const tels = res.data.tel.split('-');
        setTel1(tels[0]);
        setTel2(tels[1]);
        setTel3(tels[2]);
        setUsername(res.data.username);
        setEnroll_company({
          ...enroll_company,
          address: res.data.addr1,
          zonecode: res.data.zipcode,
        });

        setAddr2(res.data.addr2);
      })
      .catch((err) => {
        console.log(err, 'err입니다.');
      });
  }, []);

  const handleInfoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tel = tel1 + '-' + tel2 + '-' + tel3;
    // console.log(tel);

    if (CheckValid()) {
      try {
        const config: object = {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        };
        // console.log(enroll_company.zonecode, enroll_company.address);
        // console.log({
        //   username,
        //   nickname,
        //   addr1: enroll_company.address,
        //   addr2,
        //   tel,
        //   userId,
        // });
        // console.log(accessToken);
        const zipcode = enroll_company.zonecode;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        return await axios
          .post('https://i8e208.p.ssafy.io/api/account/update', {
            userid: userId,
            addr1: enroll_company.address,
            addr2,
            zipcode: enroll_company.zonecode,
            tel,
            username,
            nickname,
          })
          .then((res) => {
            console.log(res, '정보 변경 api 시도 성공!');
            Setname(username);
            SetNickName(nickname);
            alert('정보가 변경되었습니다.');
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        console.log('Errrrrrr');
      }
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // console.log(enroll_company.address);
    // console.log(password1);
    // console.log(password2);
    // console.log(confirmPassword2);
    if (CheckValidPassword()) {
      try {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        return await axios
          .post('https://i8e208.p.ssafy.io/api/account/updatePw', {
            nowPw: password1,
            newPw: password2,
          })
          .then((res) => {
            console.log(res, '비밀번호 변경 api 시도 성공!');
            if (res.data === '비밀번호가 수정되었습니다.') {
              alert('정보가 변경되었습니다.');
            } else if (res.data === '비밀번호가 일치하지 않습니다.') {
              alert('현재 비밀번호를 틀리셨습니다.');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        console.log('Errrrrrr');
      }
    }
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
        if (e.data === 'Y') {
          alert(`You can't do it! 😅`);
          setNickDubCheck(false);
        } else if (e.data === 'N') {
          alert('You can do it! 👍');
          setNickDubCheck(true);
        }
      })
      .catch((err) => {
        alert(`You can't do it! 😅`);
        console.log('error', err);
        setNickDubCheck(false);
      });
    console.log('abc');
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

    // console.log(birthYear, birthMonth, birthDay);
    // console.log(typeof birthYear, typeof birthMonth, typeof birthDay);

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

    return true;
  }

  function CheckValidPassword() {
    //비밀번호 영문자+숫자+특수조합(8~12자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;

    if (!pwdCheck.test(password1)) {
      alert(
        '비밀번호는 영문자+숫자+특수문자 조합으로 8~12자리 사용해야 합니다.',
      );
      return false;
    }
    if (!pwdCheck.test(password2)) {
      alert(
        '비밀번호는 영문자+숫자+특수문자 조합으로 8~12자리 사용해야 합니다.',
      );
      return false;
    }

    if (password2 !== confirmPassword2) {
      alert('비밀번호가 다릅니다.');
      return false;
    }
    return true;
  }

  return (
    <div className="info-page">
      <div className="emailBox">
        <p className="infopage-title">| Manage Account</p>
        <p className="m-1">이메일</p>
        <form className="emailForm">
          <input
            type="text"
            className="inputBox"
            disabled
            placeholder={userId}
            id="disabled-input-box"
          />
        </form>
        <p className="m-1">이름</p>
        <input
          type="text"
          className={`${username ? 'inputBox checkedNickname' : 'inputBox'}`}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={6}
          value={username}
        />
        <p className="m-1">닉네임</p>
        <div className={`${nickDubCheck ? 'nickname-box checkedNickname' : 'nickname-box'}`}>
          {/* <form > */}
            <input
              type="text"
              maxLength={10}
              placeholder="2~10자리 한글/영어"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNickDubCheck(false);
                console.log(e.target.value);
              }}
            />
            <button className="formSideButton" onClick={CheckNickname} style={{ width: '75px' }}>
              중복확인
            </button>
          {/* </form> */}
        </div>

        <p className="m-1">생년월일</p>
        <form className="emailForm">
          <div
            className="mini-input-container"
            id="birth-box"
            style={{ color: '#B6BAC1', background: '#eeeeee' }}
          >
            <input
              type="number"
              className="mini-input-box"
              placeholder="2000"
              maxLength={4}
              value={birthYear}
              onChange={(e) => setBirthyear(e.target.value)}
              disabled
            />
            <span>년</span>
            <input
              type="number"
              className="mini-input-box"
              placeholder="10"
              min="1"
              max="12"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              disabled
            />
            <span>월</span>
            <input
              type="number"
              className="mini-input-box"
              placeholder="10"
              maxLength={2}
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              disabled
            />
            <span>일</span>
          </div>
        </form>
        <p className="m-1">연락처</p>
        <form className="emailForm">
          <div className={`${ telCehck().length < 1 ? 'mini-input-container checkedNickname' : 'mini-input-container'}`}>
            <input
              type="number"
              className="mini-input-box"
              placeholder="010"
              maxLength={3}
              value={tel1}
              onChange={(e) => setTel1(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              className="mini-input-box"
              placeholder="8888"
              maxLength={4}
              value={tel2}
              onChange={(e) => setTel2(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              className="mini-input-box"
              placeholder="8888"
              maxLength={4}
              value={tel3}
              onChange={(e) => setTel3(e.target.value)}
            />
          </div>
          <div className="address-form-container">
            <label htmlFor="태그">주소</label>
            <input
              className={`${ enroll_company?.zonecode?.length > 0 ? 'address-form postcode checkedNickname' : 'address-form postcode'}`}
              type="text"
              // 바꿀거
              value={enroll_company.zonecode}
              placeholder="우편번호"
              disabled
              style={{ width: '20%' }}
            />
            <div
              className={`${ enroll_company?.address?.length > 0 ? 'address-form checkedNickname' : 'address-form'}`}
              style={{ width: '100%', marginBottom: '20px' }}
            >
              <input
                type="text"
                placeholder="주소"
                required={true}
                name="address"
                onChange={handleInput}
                // 바꿀거
                value={enroll_company.address}
                disabled
              />
              <Postcode
                company={enroll_company}
                setcompany={setEnroll_company}
              />
            </div>
          </div>
          <div>
            <label htmlFor="상세주소">상세주소</label>
            <div className="input-form">
              <input
                type="text"
                name="상세주소"
                onChange={(e) => setAddr2(e.target.value)}
                value={addr2}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </form>

        <form className="emailForm" onSubmit={handleInfoSubmit} method="get">
          <button type="submit"
            className={`${ ( (enroll_company?.address?.length > 0) &&
              (enroll_company?.zonecode?.length > 0) &&
              (telCehck().length < 1) && 
              nickDubCheck && 
              (username.length > 0) ) ? 'loginButton font-bold' : 'loginButton-d font-bold'}`} 
            disabled={
                !( (enroll_company?.address?.length > 0) &&
                (enroll_company?.zonecode?.length > 0) &&
                (telCehck().length < 1) && 
                nickDubCheck && 
                (username.length > 0) )
              }>
            정보 수정하기
          </button>
        </form>

        <hr className="divide-info-tap"></hr>

        <form
          className="emailForm"
          onSubmit={handlePasswordSubmit}
          method="get"
        >
          <span className="m-1">현재 비밀번호</span>
          <form className="emailForm">
            <input
              type="password"
              className="inputBox"
              maxLength={12}
              placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
              onChange={(e) => setPassword1(e.target.value)}
              style={{ width: '100%', marginBottom: '40px' }}
            />
          </form>
          <span className="m-1">새로운 비밀번호</span>
          <form className="emailForm">
            <input
              type="password"
              className={`${!pwCheck5() ? 'inputBox checkedNickname' : 'inputBox'}`}
              maxLength={12}
              placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
              onChange={(e) => setPassword2(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
              <div style={{position:"relative", left:"10%", marginBottom:"5%"}}>
                <h1 style={{color:"red"}}>{pwCheck1()}</h1>
                <h1 style={{color:"red"}}>{pwCheck2()}</h1>
                <h1 style={{color:"red"}}>{pwCheck3()}</h1>
                <h1 style={{color:"red"}}>{pwCheck4()}</h1>
                <h1 style={{color:"red"}}>{pwCheck5()}</h1>
              </div>
          </form>
          <span className="m-1">새로운 비밀번호 확인</span>
          <form className="emailForm">
            <input
              type="password"
              className={`${(password2 == confirmPassword2) ? 'inputBox checkedNickname' : 'inputBox'}`}
              maxLength={12}
              placeholder={'영어, 숫자, 특수문자를 포함한 8~12자리'}
              onChange={(e) => setConfirmPassword2(e.target.value)}
            />
              <div style={{position:"relative", left:"10%", marginBottom:"5%"}}>
                { ( (password2 != confirmPassword2) || password2.length < 1 ) ? 
                  (<h1 style={{color:"red"}}>비밀번호가 일치하지 않습니다.</h1>) :
                   null
                }
              </div>
          </form>
          <button type="submit" 
            className={`${ ( 
              (password2 == confirmPassword2) && 
              (pwCheck5().length < 1) ) ? 'loginButton font-bold' : 'loginButton-d font-bold'}`}
            disabled={
              !(
                password2 === confirmPassword2 &&
                password2.length > 0 &&
                (pwCheck5().length < 1)
              )
            }>
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}
