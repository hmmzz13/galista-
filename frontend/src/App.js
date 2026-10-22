import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "@/i18n";
import { LANGS } from "@/i18n";
import Home from "@/pages/Home";
import "@/App.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F7F2E9",
            color: "#4B3026",
            fontFamily: "Manrope, sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2rem", marginBottom: "0.5rem" }}>
              Galista Café
            </p>
            <p style={{ color: "#6E5B53" }}>Une erreur est survenue. Merci de recharger la page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LangRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("galista-lang");
    } catch (e) {
      saved = null;
    }
    const browser = (navigator.language || "fr").slice(0, 2).toLowerCase();
    const lng = LANGS.includes(saved) ? saved : LANGS.includes(browser) ? browser : "fr";
    navigate(`/${lng}`, { replace: true });
  }, [navigate]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LangRedirect />} />
          <Route path="/:lang" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
