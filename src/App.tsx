import { useState } from 'react'
import './App.css'
import { useStore } from './hooks/use-store';
import { useSidebar } from './hooks/use-sidebar';
import { cn } from './lib/utils';
import { Sidebar } from './components/sidebar';
import "./app/global.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard';
import Settings from './app/pages/Settings';
import Exercises from './app/pages/exercises/Exercises';
import ExerciseNewPage from './app/pages/exercises/new/page';
import { Toaster } from "./components/ui/toaster"
import ExerciseEditPage from './app/pages/exercises/edit/page';
import Login from './app/pages/Login';
import Logout from './app/pages/Logout';

function setToken(userToken:any) {
  console.log("setToken", JSON.stringify(userToken));
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token') || "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();
  const handleToken = async (data:any) => {
    setToken(data);

  }

  if(!token) {
    return <Login setToken={handleToken} />
  }

  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  
  return (
    <>
      { token && <Sidebar />} 
      <Router>
        <main
          className={cn(
            "min-h-[calc(100vh_-_16px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercises/new" element={<ExerciseNewPage />} />
            <Route path="/exercises/edit/:id" element={<ExerciseEditPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes> 
          <Toaster />  
        </main>
      </Router>
    </>
  )
}

export default App