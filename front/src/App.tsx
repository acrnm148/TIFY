import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './fixture/Header';
import { GiftHubPage } from './pages/GiftHubPage';
import { MakeWishPage } from './pages/MakeWishPage';
import { CheckWishPage } from './pages/CheckWishPage';
import { ThanksPage } from './pages/ThanksPage';
import { FriendsPage } from './pages/FriendsPage';
import { MyPage } from './pages/mypage/MyPage';
import { LikePage } from './pages/LikePage';
import { AlramPage } from './pages/AlramPage';
import { FaqPage } from './pages/FaqPage';
import { AskPage } from './pages/AskPage';

import { LoginPage } from './pages/LoginPage';
import { AuthKakao } from './components/AuthKakao';
import { JoinFirstPage } from './pages/JoinFirstPage';
import { JoinSecondPage } from './pages/JoinSecondPage';
import { JoinThirdPage } from './pages/JoinThirdPage';

import { MyWish } from './components/Mywish';
import { Joined } from './components/Joined';
import { Friend } from './components/Friend';
import { MyInfo } from './components/MyInfo';
import { PhoneBook } from './components/PhoneBook';
import { OrderList } from './components/OrderList';
import { CongratsPage } from './pages/CongratsPage';
import { CongratsPayPage } from './pages/CongratsPayPage';
import { CongratsCardPage } from './pages/CongratsCardPage';
import GiftItemDetailPage from './pages/GiftItemDetailPage';

import { Footer } from './fixture/Footer';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';
import PayingService from './components/PayingService';
import PayResult from './components/PayResult';

import './css/styles.css';
import { GiftHubDetailPage } from './pages/GiftHubDetailPage';

import { useReducer } from 'react';
import { Login } from './components/Auth';

const initialState = {
  authenticated: false,
  token: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.token, authenticated: action.result };
    default:
      return state;
  }
}

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

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/gifthub" element={<GiftHubPage />} />
        <Route path="/gifthub/:giftId" element={<GiftHubDetailPage />} />
        <Route path="/makewish" element={<MakeWishPage />} />
        <Route path="/checkwish" element={<CheckWishPage />} />
        <Route path="/thanks/:wishId/:conId" element={<ThanksPage />} />
        <Route path="/friends" element={<FriendsPage />} />
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
        <Route path="/gifthub/:giftId" element={<GiftItemDetailPage />} />

        <Route path="/mypage" element={<MyPage />}>
          <Route path="mywish" element={<MyWish />} />
          <Route path="joined" element={<Joined />} />
          <Route path="friend" element={<Friend />} />
          <Route path="info" element={<MyInfo />} />
          <Route path="phone" element={<PhoneBook />} />
          <Route path="order" element={<OrderList />} />
        </Route>

        <Route path="/like" element={<LikePage />} />
        <Route path="/alram" element={<AlramPage />} />

        <Route path="/faq" element={<FaqPage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/login" element={<LoginPage />}>
          <Route path="/" element={<AskPage />} />
        </Route>
        <Route path="/join1" element={<JoinFirstPage />} />
        <Route path="/join2" element={<JoinSecondPage />} />
        <Route path="/join3" element={<JoinThirdPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
