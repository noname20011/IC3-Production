import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import NavigationBar from "@/components/UI/NavigationBar";
import NotifyPopUp from "@/components/UI/NotifyPopUp";
import AdminSidebar from "@/components/UI/admin/AdminSideBar";
import ScrollToTop from "@/components/core/ScrollToTop";
import { Toaster } from "@/components/core/Toaster";
import { LoadingProvider } from "@/hooks/use-context";
import HomePage from "@/pages/Home";
import LeaderboardPage from "@/pages/LeaderboardPage";
import LevelPage from "@/pages/LevelPage";
import NotFoundPage from "@/pages/NotFoundPage";
import PartPage from "@/pages/PartPage";
import QuizPage from "@/pages/QuizPage";
import DataManagement from "@/pages/admin/DataManagement";
import { Login } from "@/pages/admin/Login";
import LoginPage from "@/pages/admin/Loginv1";
import QuestionManager from "@/pages/admin/QuestionsComponent";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useStompSubscription } from "./hooks/useStompSubscription";

export default function App() {
  const location = useLocation();
  const locationPath = location.pathname;
  const [screen, setScreen] = useState("adminlogin");
  const [showRoyalCelebration, setShowRoyalCelebration] = useState<boolean>(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const nav = (s: string) => setScreen(s);
  const navToPart = (partId: string | null) => { setSelectedPartId(partId); nav("questionmgr"); };
  
  const [shoolId, setShoolId] = useState(localStorage.getItem("school") || "");
  const [messageNotify, setMessageNotify] = useState("");  
  

  const takeRanksBySchool = (schoolId: string) => {
    localStorage.setItem("school", schoolId);
    setShoolId(schoolId);
  }

  // Socket
  const handleTop1Notification = useCallback((data: any) => {
    console.log("🔥 WebSocket notification:", data);

    sessionStorage.setItem(
      "rank-top-1",
      JSON.stringify(data?.data)
    );

      setMessageNotify(data?.message); // show Pop up Congratulation
      setShowRoyalCelebration(true);
    
  }, []);
  
  useStompSubscription<string>(
    `/topic/top-1-in-school/${shoolId}`,
    handleTop1Notification,
    {
      enabled: Boolean(shoolId),
    }
  );

  return (
    <>
      <ScrollToTop />
      <div className="bg-devotion-neon py-2 px-2 relative">
        <LoadingProvider>
          {/* Header */}
          {!locationPath.startsWith("/admin") && <Header locationPath={locationPath} onBack={() => window.history.back()}/>}

            <NotifyPopUp showRoyalCelebration={showRoyalCelebration} setShowRoyalCelebration={setShowRoyalCelebration} message={messageNotify}/>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/level" element={<LevelPage />} />
            <Route path="/level/:levelId/parts" element={<PartPage takeRanksBySchool={takeRanksBySchool}/>} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/quiz/:levelId/:partId" element={<QuizPage/>} />
            <Route path="*" element={<NotFoundPage/>} />

            {/* ADMIN */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/login1" element={<LoginPage />} />
            <Route path="/admin/part/:partId/management" element={<DataManagement onNavigate={nav} onOpenPartQuestions={navToPart} />}/>
            <Route path="/admin/:partId/question/management" element={<QuestionManager partId={selectedPartId} onBack={() => nav("datamgmt")} onNavigate={nav} />}/>

          </Routes>
          {/* side bar */}
          {!locationPath.startsWith("/quiz") && !locationPath.startsWith("/admin")  && <NavigationBar /> }
          {!locationPath.startsWith("/admin/login") && locationPath.startsWith("/admin") && <AdminSidebar active={screen} onNavigate={setScreen}/>}
          {/* {locationPath.startsWith("/admin/login") && <AdminSidebar/>} */}

        </LoadingProvider>
        <Toaster/>
        {!locationPath.startsWith("/admin") && <Footer/>}
      </div>
    </>
  );
}