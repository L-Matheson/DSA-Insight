import { Outlet } from "react-router-dom"; // Import Outlet

import "./App.css";
import Header from "./components/global/Header";

function App() {
  return (
    <div className="app">
      <div className="app-layout">
        <div className="header-container">
          <Header />
        </div>
        <div className="content-outline">
          <div className="content">
              <Outlet /> {/* renders the child routes */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
