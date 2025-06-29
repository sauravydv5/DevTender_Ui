import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore";
import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Premium from "./Components/Premium";
import Chat from "./Components/Chat";

import {
  createPayment,
  verifyPayment,
  getPaymentByOrderId,
} from "./Components/PaymentApi";
import PaymentSuccess from "./Components/PaymentSuccess";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              {/* <Route path="/paymentapi" element={<PaymentApi />} /> */}
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
