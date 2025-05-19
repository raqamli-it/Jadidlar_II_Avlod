import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./page/Home";
import Jadidlar from "./page/Jadidlar";
import NotFound from "./page/404";
import NewsDetail from "./page/NewsDetail";
import Korular from "./components/Korular";
import Foydalanuvchi from "./page/Foydalanuvchi";
import JadidlarAll from "./page/JadidlarAll";
import NewsMain from "./page/NewsMain";
import MeetingDetail from "./page/MeetingsDetail";
import MeetingsPage from "./page/MeetingsPage";
import CollectionPage from "./page/CollectionPage";
import ResearchPage from "./page/ResearchPage";
import ArchiveDocuments from "./page/ArchiveDocuments";
import Turkiston from "./page/Turkish";
import About from "./page/About";
import SeminarsPage from "./page/SeminarsPage";
import SeminarsDetail from "./page/SeminarsDetail";
import Press from "./page/Press";
import Foto from "./page/Foto";
import FotoPage from "./page/FotoPage";
import Video from "./page/Video";
import Audio from "./page/Audio";
import SearchPage from "./page/SearchPage";
import Login from "./page/Login";
import { Toaster } from "react-hot-toast";
import Register from "./page/Register";
import { GoogleLogin } from "@react-oauth/google";
import ForgotPassword from "./page/ForgotPassword";

function App() {
  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      <Toaster position="top-right" />
      {/* salom  add */}
      <Routes>
        <Route path="/" Component={Layout}>
          {/* home dagi barcha componentlar optimallashtirildi  */}
          <Route path="/" Component={Home} />
          {/*Loginga tegilmadi   */}
          <Route path="/kirish" Component={Login} />
          {/* forgot password ga ham tegilmadi  */}
          <Route path="/parolni_unutish" Component={ForgotPassword} />
          {/* register ga ham tegilmadi */}
          <Route path="/roʻyxatdan_oʻtish" Component={Register} />
          {/* newsmain dagi barcha componentlar optimallashtirildi */}
          <Route path="/yangiliklar" Component={NewsMain} />
          {/* news detaildagi barcha componentlar optimallashtirildi */}
          <Route path="/yangiliklar/:id" Component={NewsDetail} />
          {/* meeting Pg dagi barcha componentlar optimallashtirildi */}
          <Route path="/yigʻinlar" Component={MeetingsPage} />
          {/* meeting detail korib chiqildi lekin ozgartirilmadi  */}
          <Route path="/yigʻinlar/:id" Component={MeetingDetail} />
          {/* seminarlar page ga tgeilmadi */}
          <Route path="/seminarlar" Component={SeminarsPage} />
          {/* seminars detail ga tegilmadi lekin korib chiqildi va shu hulosaga kelindi  */}
          <Route path="/seminarlar/:id" Component={SeminarsDetail} />

          <Route path="/jadid_haqida" Component={Jadidlar} />
          <Route path="/koruvlar" Component={Korular} />
          <Route path="/foydalanuvchi" Component={Foydalanuvchi} />
          <Route path="/jadidlar" Component={JadidlarAll} />
          <Route path="/jadidlar/:id" Component={Jadidlar} />
          <Route path="/til_va_imlo" Component={CollectionPage} />
          <Route path="/til_va_imlo/:tab" Component={CollectionPage} />
          <Route path="/izlanishlar" Component={ResearchPage} />
          <Route path="/izlanishlar/:tab" Component={ResearchPage} />
          <Route path="/arxiv_hujjatlar" Component={ArchiveDocuments} />
          <Route path="/arxiv_hujjatlar/:tab" Component={ArchiveDocuments} />
          <Route path="/matbuot" Component={Press} />
          <Route path="/matbuot/:tab" Component={Press} />
          <Route path="/turkiston_muxtoriyati" Component={Turkiston} />
          <Route path="/turkiston_muxtoriyati/:tab" Component={Turkiston} />
          <Route path="/suratlar/:id" Component={Foto} />
          <Route path="/suratlar" Component={FotoPage} />
          <Route path="/koʻruvlar" Component={Video} />
          <Route path="/koʻruvlar/:id" Component={Video} />
          <Route path="/eshituvlar" Component={Audio} />
          <Route path="/search" Component={SearchPage} />
          <Route path="/biz_haqimizda" Component={About} />
          <Route path="*" Component={NotFound} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
