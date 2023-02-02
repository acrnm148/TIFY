import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [doRequest, setDoRequest] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(doRequest);
    setDoRequest(true);

    try {
      setIsLoading(true);
      await axios
        .get(
          `https://i8e208.p.ssafy.io/api/account/sendEmailAuth?email=${email}`,
        )
        .then((r) => {
          console.log('요청 보냄!');
          console.log(doRequest);
          console.log(r);
          alert(
            '요청하신 주소로 인증 요청 메일을 보냈습니다. 확인 후 완료 버튼을 눌러주세요.',
          );
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Error sending email. Please try again later.');
    }
  };

  const navigate = useNavigate();
  function GoNext() {
    navigate('/join2', {
      state: {
        emailData: email,
      },
    });
  }

  return (
    <div className="grayBackground">
      <div className="insideBox">
        <p className="title">Password Reset</p>
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
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
                  onChange={(e) => setEmail(e.target.value)}
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
