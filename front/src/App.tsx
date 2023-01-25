import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './fixture/Header';
import { GiftHubPage } from './pages/GiftHubPage';
import { MakeWishPage } from './pages/MakeWishPage';
import { CheckWishPage } from './pages/CheckWishPage';
import { ThanksPage } from './pages/ThanksPage';
import { FriendsPage } from './pages/FriendsPage';
import { MyPage } from './pages/MyPage';
import { LikePage } from './pages/LikePage';
import { AlramPage } from './pages/AlramPage';
import { FaqPage } from './pages/FaqPage';
import { AskPage } from './pages/AskPage';
import { LoginPage } from './pages/LoginPage';
import { JoinFirstPage } from './pages/JoinFirstPage';
import { JoinSecondPage } from './pages/JoinSecondPage';
import { JoinThirdPage } from './pages/JoinThirdPage';
import { Footer } from './fixture/Footer';

import { MainPage } from './pages/MainPage';

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

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/alram" element={<AlramPage />} />

        <Route path="/faq" element={<FaqPage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join1" element={<JoinFirstPage />} />
        <Route path="/join2" element={<JoinSecondPage />} />
        <Route path="/join3" element={<JoinThirdPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
