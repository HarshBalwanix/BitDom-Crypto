import React from "react";
import { Link } from "react-router-dom";
import { SiBitcoinsv } from "react-icons/si";
const Header = () => {
  return (
    <div className="navbar flex items-center justify-evenly  bg-[#0e062f] p-0 m-0 sm:py-4 h-16 ">
      <div className="logo flex items-center">
        <h1 className="text-xl sm:text-4xl">BITDOM</h1>
        <SiBitcoinsv color="orange" size={"35"} />
      </div>
      <ul className="flex ">
        <li>
          <Link className="ml-2 text-lg sm:ml-60 sm:text-xl" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="ml-2 text-lg sm:ml-60 sm:text-xl" to="/coins">
            Market
          </Link>
        </li>
        <li>
          <Link
            className="ml-2 text-lg sm:ml-60 sm:text-xl"
            to="https://www.linkedin.com/company/blockchain-club-vitb/mycompany"
            target="_blank"
          >
            Join Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
