import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function JoinFirstPage() {
  const [email, setEmail] = useState('');
  const [doRequest, setDoRequest] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios
        .get(`https://i8e208.p.ssafy.io/api/dupEmailCheck?userid=${email}`)
        .then((r) => {
          console.log(r.data);
          if (r.data == '유저가 존재합니다.') {
            alert('이미 존재하는 이메일입니다.');
          } else {
            axios
              .get(
                `https://i8e208.p.ssafy.io/api/account/sendEmailAuth?email=${email}`,
              )
              .then((r) => {
                setDoRequest(true);
                console.log('요청 보냄!');
                console.log(doRequest);
                console.log(r);
                alert(
                  '요청하신 주소로 인증 요청 메일을 보냈습니다. 확인 후 완료 버튼을 눌러주세요.',
                );
              })
              .catch((err) => {
                console.log(err, '에러!!');
              });
          }
        })
        .catch((err) => {
          console.log(err, 'errrr');
        });
    } catch (err) {}
  };

  const navigate = useNavigate();
  function GoNext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .get(
        `https://i8e208.p.ssafy.io/api/account/checkEmailState?email=${email}`,
      )
      .then((r) => {
        console.log(r);
        if (r.data == 'Y') {
          alert('이메일 인증이 확인되었습니다. 추가 정보를 입력해주세요.');
          navigate('/join2', {
            state: {
              emailData: email,
            },
          });
        } else if (r.data == 'N') {
          alert(
            '아직 이메일 인증이 확인되지 않습니다. 인증 완료 후 시도해주세요',
          );
        }
      })
      .catch((err) => {
        console.log(err, 'errrr');
      });
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
              <p className="text-[#E0E0E0] processtext">회원정보 입력</p>
              <img src={checkIcon} className="checkIcon" />
            </div>
            <div>
              <hr className="line" />
            </div>
            <div className="processBox">
              <p className="text-[#E0E0E0] processtext">가입 완료</p>
              <img src={checkIcon} className="checkIcon" />
            </div>
          </div>
          <div className="emailBox">
            <p className="m-1">이메일</p>
            {doRequest ? (
              <form className="emailForm" onSubmit={GoNext}>
                <input
                  type="email"
                  className="inputBox"
                  id="emailForm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setDoRequest(false);
                  }}
                  required
                  // disabled
                />
                <button type="submit" className="loginButton font-bold">
                  이메일 인증 완료
                </button>
              </form>
            ) : (
              <form className="emailForm" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="inputBox"
                  id="emailForm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <button type="submit" className="loginButton font-bold">
                  이메일 인증 요청
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
