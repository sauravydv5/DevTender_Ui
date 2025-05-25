import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

{
  /* <Route path="/login" element={<div>Login Page</div>} />
<Route path="/test" element={<div>Test Page</div>} /> */
}
