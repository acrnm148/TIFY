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
import PayingPort from './components/PayingPort';

import { Footer } from './fixture/Footer';
import { MainPage } from './pages/MainPage';
import PayingService from './components/PayingService';
import PayResult from './components/PayResult';
import WishSuccess from './components/WishSuccess';

import './css/styles.css';
import { GiftHubDetailPage } from './pages/GiftHubDetailPage';
function App() {
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
        <Route path='/congrats/import' element={<PayingPort />} />
        <Route path='/makewish/success' element={<WishSuccess />} />
        
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join1" element={<JoinFirstPage />} />
        <Route path="/account/confirmEmail" element={<JoinSecondPage />} />
        <Route path="/join3" element={<JoinThirdPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
