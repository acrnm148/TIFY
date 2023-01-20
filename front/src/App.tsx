import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./fixture/Header";
import { GiftHubPage } from "./components/pages/GiftHubPage";
import { WishPage } from "./components/pages/WishPage";
import { ThanksPage } from "./components/pages/ThanksPage";
import { FriendsPage } from "./components/pages/FriendsPage";
import { MyPage} from "./components/pages/MyPage";
import { LikePage} from "./components/pages/LikePage";
import { AlramPage} from "./components/pages/AlramPage";
import { FaqPage } from "./components/pages/FaqPage";
import { AskPage } from "./components/pages/AskPage";
import { Footer } from "./fixture/Footer";
function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/gifthub" element={<GiftHubPage />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/alram" element={<AlramPage />} />

        <Route path="/faq" element={<FaqPage />}/>
        <Route path="/ask" element={<AskPage />} />
      </Routes>
      <Footer />




    </BrowserRouter>
  </>
  );
}

export default App;
