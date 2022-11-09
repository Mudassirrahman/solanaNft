import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponents from "./MainComponents";
import Nfts from "./components/Nfts";
import MyProfile from "./components/MyProfile";
import AboutSec from "./components/AboutSec";
import Pdetails from "./components/productDetails/Pdetails"
import FAQs from "./components/faqs/FAQs";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} exact element={<MainComponents />} />
          <Route path="/nfts" exact element={<Nfts />} />
          <Route path="nfts/:productId" element={<Pdetails />} />
          <Route path="/myProfile" exact element={<MyProfile />} />
          <Route path="/aboutSec" exact element={<AboutSec />} />
          <Route path="/faqs" exact element={<FAQs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
