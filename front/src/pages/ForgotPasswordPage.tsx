import '../css/login.styles.css';
import coloredCheckIcon from '../assets/iconColoredCheck.svg';
import checkIcon from '../assets/iconCheck.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const navigate = useNavigate();

    // axios.get(`http://i8e208.p.ssafy.io/api/account/checkEmailState`);

    try {
      // 해당 이메일이 존재하는지 먼저 체크해보기
      await axios
        .get(
          `https://i8e208.p.ssafy.io/api/account/sendEmailAuth?email=${email}`,
        )
        .then((r) => {
          console.log('요청 보냄!');
          console.log(r);
          alert(
            '요청하신 주소로 인증 요청 메일을 보냈습니다. 확인 후 완료 버튼을 눌러주세요.',
          );
        });
    } catch (err) {
      setError('Error sending email. Please try again later.');
    }
  };

  return (
    <div className="grayBackground">
      <div className="insideBox">
        <p className="title">Password Reset</p>
        <div className="loginBox">
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
