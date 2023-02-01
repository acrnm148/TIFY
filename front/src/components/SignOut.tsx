import axios from 'axios';
import { useSelector } from 'react-redux';

export function SignOut() {
  let accessToken = useSelector((state) => {
    return state.authToken.accessToken;
  });

  console.log('회원탈퇴 하지마!!!');

  // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기

  function handleSignOut() {
    console.log(accessToken);
    console.log('회원탈퇴 시도');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios
      .delete('https://i8e208.p.ssafy.io/api/account/signout')
      .then((res) => {
        console.log(res);
        console.log('회원탈퇴 성공');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <button onClick={handleSignOut}>회원탈퇴</button>;
}
