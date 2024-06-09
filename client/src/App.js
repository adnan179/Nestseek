import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/test";
//pages
import { LoginPage, BuyerPage, SellerPage, RegisterPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/t" element={<Test />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route
        path="/seller"
        element={<ProtectedRoute role="seller" component={SellerPage} />}
      />
      <Route
        path="/buyer"
        element={<ProtectedRoute role="buyer" component={BuyerPage} />}
      />
    </Routes>
  );
};

export default App;
