import "../App.css";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./provider";
import AppRoutes from "./router";

function App() {
  return (
    // App Providers
    <AppProviders>
      <BrowserRouter>
        {/* Routes */}
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
