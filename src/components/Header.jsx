import React from "react";
import { Link } from "react-router-dom";
import { SiBitcoinsv } from "react-icons/si";
const Header = () => {
  return (
    <div className="flex items-center justify-evenly text-white bg-[#0e062f] py-4">
      <div className="flex items-center">
        <h1 className="text-4xl">BITDOM</h1>
        <SiBitcoinsv color="orange" size={"35"} />
      </div>
      <ul className="flex ">
        <li>
          <Link className="ml-60 text-xl" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="ml-60 text-xl" to="/coins">
            Market
          </Link>
        </li>
        <li>
          <Link className="ml-60 text-xl" to="/join">
            Join Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
