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

export default function App() {
  const location = useLocation();
  const locationPath = location.pathname;
  
  return (
    <>
      <ScrollToTop />
      <div className="bg-background py-2 px-2 relative">
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