import React from "react";
import "./styles/index.scss";

import BarChartPage from "./pages/BarChart";
import RegistrationPage from "./pages/Registration";

function App() {
  const [isAccountCreated, setIsAccountCreated] = React.useState(false);
  return (
    <div className="app">
      <div className="app-container box-shadow--cont">
        {isAccountCreated ? (
          <BarChartPage />
        ) : (
          <RegistrationPage
            onAccountCreate={() => {
              setIsAccountCreated(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
