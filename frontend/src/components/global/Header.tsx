import React from "react";

const Header = () => {
  const navItems = ["NHL", "NBA", "NFL", "MLB", "UFC", "Soccer", "More Sports"];

  const fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#000000",
        borderBottom: "1px solid #2a2a2a",
        zIndex: 1000,
        fontFamily: fontStack
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: "64px",
          justifyContent: "space-between"
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {/* Logo */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              cursor: "pointer"
            }}
          >
            Sports Insight
          </div>

          {/* Navigation */}
          <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "#b3b3b3",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.2px",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b3b3b3")}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#b3b3b3",
              border: "1px solid #3a3a3a",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s, border-color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
              e.currentTarget.style.borderColor = "#4a4a4a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#3a3a3a";
            }}
          >
            Log In
          </button>

          <button
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6e6e6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
          >
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
