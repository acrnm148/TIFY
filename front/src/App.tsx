import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./fixture/Header";
import { GiftHubPage } from "./pages/GiftHubPage";
import { WishPage } from "./pages/WishPage";
import { ThanksPage } from "./pages/ThanksPage";
import { FriendsPage } from "./pages/FriendsPage";
import { MyPage} from "./pages/MyPage";
import { LikePage} from "./pages/LikePage";
import { AlramPage} from "./pages/AlramPage";
import { FaqPage } from "./pages/FaqPage";
import { AskPage } from "./pages/AskPage";
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
