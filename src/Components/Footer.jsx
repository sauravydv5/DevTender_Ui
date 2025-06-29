import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="fixed bottom-0 p-4 footer sm:footer-horizontal footer-center bg-base-200 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
