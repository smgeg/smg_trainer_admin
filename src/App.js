import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Subscriptions from "./scenes/subscriptions";
import Customers from "./scenes/customers";
import Courses from "./scenes/courses";
import AddCourseForm from "./scenes/courses/addForm";
import AddCustomerForm from "./scenes/customers/addForm";
import LoginPage from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { io } = require("socket.io-client");

  const socket = io(process.env.REACT_APP_BACKEND_URL);
  socket.on("connect", () => {
    console.log(socket.id);
  });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {window.location.pathname !== "/login" && (
            <Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            {window.location.pathname !== "/login" && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/" element={<Subscriptions />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomer" element={<AddCustomerForm />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/addCourse" element={<AddCourseForm />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
