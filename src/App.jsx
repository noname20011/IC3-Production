import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PartPage from "./pages/PartPage";
import QuizPage from "./pages/QuizPage";
import { Login } from "./pages/admin/Login";
import NotFoundPage from "./pages/NotFoundPage";
import NavigationBar from "./components/UI/NavigationBar";
import { LoadingProvider } from "./hooks/use-context";
import HomePage from "./pages/Home";
import LevelPage from "./pages/LevelPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Header from "./components/UI/Header";
import { Toaster } from "./components/core/Toaster";
import ScrollToTop from "./components/core/ScrollToTop";
import Footer from "./components/UI/Footer";
import AdminSidebar from "@/components/UI/admin/AdminSideBar";
import { useState } from "react";
import DataManagement from "@/pages/admin/DataManagement";
import QuestionManager from "@/pages/admin/QuestionsComponent";
import LoginPage from "./pages/admin/Loginv1";

export default function App() {
  const location = useLocation();
  const locationPath = location.pathname;
  const [screen, setScreen] = useState("adminlogin");
  const [selectedPartId, setSelectedPartId] = useState(null);

  const nav = (s) => setScreen(s);
  const navToPart = (partId) => { setSelectedPartId(partId); nav("questionmgr"); };
  
  return (
    <>
      <ScrollToTop />
      <div className="bg-devotion-neon py-2 px-2 relative">
        <LoadingProvider>
          {/* Header */}
          {!locationPath.startsWith("/admin") && <Header locationPath={locationPath} onBack={() => window.history.back()}/>}
            
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/level" element={<LevelPage />} />
            <Route path="/level/:levelId/parts" element={<PartPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage onBack={() => window.history.back()} />} />
            <Route path="/quiz/:levelId/:partId" element={<QuizPage onBack={() => window.history.back()} />} />
            <Route path="*" element={<NotFoundPage/>} />

            {/* ADMIN */}
            <Route path="/admin/login" element={<Login onBack={() => window.location.href = "/admin/dashboard"} />} />
            <Route path="/admin/login1" element={<LoginPage onBack={() => window.location.href = "/admin/dashboard"} />} />
            <Route path="/admin/part/:partId/management" element={<DataManagement onNavigate={nav} onOpenPartQuestions={navToPart} />}/>
            <Route path="/admin/:partId/question/management" element={<QuestionManager partId={selectedPartId} onBack={() => nav("datamgmt")} onNavigate={nav} />}/>

          </Routes>
          {/* side bar */}
          {!locationPath.startsWith("/quiz") && !locationPath.startsWith("/admin")  && <NavigationBar /> }
          {!locationPath.startsWith("/admin/login") && locationPath.startsWith("/admin") && <AdminSidebar/>}
          {/* {locationPath.startsWith("/admin/login") && <AdminSidebar/>} */}

        </LoadingProvider>
        <Toaster/>
        {!locationPath.startsWith("/admin") && <Footer/>}
      </div>
    </>
  );
}