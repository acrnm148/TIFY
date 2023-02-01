import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import { useState } from 'react';
import axios from 'axios';

export function JoinFirstPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.get(`api/account/sendEmailAuth?email=${email}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Error sending email. Please try again later.');
    }
  };

  if (isLoading) {
    return <p>Sending email...</p>;
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
          </div>
        </div>
      </div>
    </div>
  );
}
