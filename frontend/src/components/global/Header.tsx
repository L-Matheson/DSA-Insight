import React from "react";
import { Link, useNavigate } from "react-router-dom";
import courseHandler from "../../handlers/courseHandler";

const Header = () => {

  const navItems = courseHandler.getAll();
 
  const fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const navigate = useNavigate();
  
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--text-secondary)",
        zIndex: 1000,
        fontFamily: fontStack,
      }}
    >
      <div
        style={{
          maxWidth: "1125px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: "64px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
              cursor: "pointer",
            }}
            onClick={() => navigate('/')}
          >
            CS-Insight
          </div>

          {/* Header Icons */}
          <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.2px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
