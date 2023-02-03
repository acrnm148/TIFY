import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './modules/routes/PrivateRoutes';
import PublicRoute from './modules/routes/PublicRoutes';

import { Header } from './fixture/Header';
import { GiftHubPage } from './pages/GiftHubPage';
import { MakeWishPage } from './pages/MakeWishPage';
import { CheckWishPage } from './pages/CheckWishPage';
import { ThanksPage } from './pages/ThanksPage';
import FriendsPage from './pages/FriendsPage';
import { MyPage } from './pages/mypage/MyPage';
import { LikePage } from './pages/LikePage';
import { AlramPage } from './pages/AlramPage';
import { FaqPage } from './pages/FaqPage';
import { AskPage } from './pages/AskPage';

import { LoginPage } from './pages/LoginPage';
import { AuthKakao } from './modules/Auth/AuthKakao';
import { AuthNaver } from './modules/Auth/AuthNaver';
import { JoinFirstPage } from './pages/JoinFirstPage';
import { JoinSecondPage } from './pages/JoinSecondPage';
import { JoinThirdPage } from './pages/JoinThirdPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { MyWish } from './components/Mywish';
import { Joined } from './components/Joined';
import { Friend } from './components/Friend';
import { MyInfo } from './components/MyInfo';
import { PhoneBook } from './components/PhoneBook';
import { OrderList } from './components/OrderList';
import { CongratsPage } from './pages/CongratsPage';
import { CongratsPayPage } from './pages/CongratsPayPage';
import { CongratsCardPage } from './pages/CongratsCardPage';
import PayingPort from './components/PayingPort';

import { Footer } from './fixture/Footer';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';
import PayingService from './components/PayingService';
import PayResult from './components/PayResult';
import WishSuccess from './components/WishSuccess';

import './css/styles.css';
import { GiftHubDetailPage } from './pages/GiftHubDetailPage';

import { useReducer } from 'react';
import { Login } from './modules/Auth/LogIn';

import ScrollTop from '../src/interface/scroll';

// const initialState = {
//   authenticated: false,
//   token: null,
// };

// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case 'SET_TOKEN':
//       return { ...state, token: action.token, authenticated: action.result };
//     default:
//       return state;
//   }
// }

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { authenticated } = state;
  // console.log(state, '-------------------------');

  // function handleLogin(id: string, password: string) {
  //   let token = Login(id, password);

  //   if (token) {
  //     console.log('로그인 성공!');
  //     dispatch({
  //       type: 'SET_TOKEN',
  //       token: token,
  //       result: true,
  //     });
  //   } else {
  //     console.log('로그인 실패');
  //     dispatch({
  //       type: 'SET_TOKEN',
  //       token: null,
  //       result: false,
  //     });
  //   }
  // }

  // 로그인 해야 하는 건 PrivateRoute안에 넣기
  // 비로그인만 가능한 건 PublicRoute안에 넣기
  return (
    <BrowserRouter>
      <ScrollTop />
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/makewish" element={<MakeWishPage />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route path="mywish" element={<MyWish />} />
            <Route path="joined" element={<Joined />} />
            <Route path="friend" element={<Friend />} />
            <Route path="info" element={<MyInfo />} />
            <Route path="phone" element={<PhoneBook />} />
            <Route path="order" element={<OrderList />} />
          </Route>
          <Route path="/checkwish" element={<CheckWishPage />} />
          <Route path="/thanks/:wishId/:conId" element={<ThanksPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/makewish/success" element={<WishSuccess />} />
          <Route path="/like" element={<LikePage />} />
          <Route path="/alram" element={<AlramPage />} />
          <Route path="/ask" element={<AskPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/join1" element={<JoinFirstPage />} />
          <Route path="/join2" element={<JoinSecondPage />} />
          <Route path="/reset" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}>
          <Route path="oauth2/code/kakao" element={<AuthKakao />} />
          <Route path="Oauth2/code/naver" element={<AuthNaver />} />
        </Route>
        <Route path="/join3" element={<JoinThirdPage />} />

        <Route path="" element={<MainPage />} />
        <Route path="/gifthub" element={<GiftHubPage />} />
        <Route path="/gifthub/:giftId" element={<GiftHubDetailPage />} />
        <Route path="/congrats/:wishId" element={<CongratsPage />} />
        <Route
          path="/congrats/:wishId/giftcard"
          element={<CongratsCardPage />}
        ></Route>
        <Route path="/congrats/kakaopay" element={<PayingService />} />
        <Route path="/congrats/:wishId/giftpay" element={<CongratsPayPage />}>
          <Route path="kakaopay" element={<PayingService />} />
        </Route>
        <Route path="/congrats/kakaopay/result" element={<PayResult />} />
        <Route path="/congrats/import" element={<PayingPort />} />

        <Route path="/faq" element={<FaqPage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
