import React, { useState } from "react";
import { ethers } from "ethers";
import "./navbar.css";
import "../../global.css";
import { Link } from "react-router-dom";
import Img from "../../assets/images/profile.svg";
import img1 from "../../assets/images/meta-fox.svg";
import img2 from "../../assets/images/Glow.svg";
import img3 from "../../assets/images/Phanton.svg";
import img4 from "../../assets/images/solf.svg";
import Cross from "../../assets/images/cross.svg";
import Modal from "./Modal";

const iconSize = {
  width: "24px",
  height: "24px",
};

const crossSize = {
  width: "30px",
  height: "30px",
};
const profile = {
  width: "20px",
  height: "20px",
};

function Navbar() {
  const [popUp, setPopUp] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);

  if (window.ethereum)
    window.ethereum.on("accountsChanged", () => connectWalletHandler());

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const req = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(req[0]);
        setBalance("Loading...");

        const balanceReq = await window.ethereum.request({
          method: "eth_getBalance",
          params: [req[0], "latest"],
        });

        const balance = +ethers.utils.formatEther(balanceReq);
        setBalance(balance);
      } else setError("Please install MetaMask");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {
    setPopUp(!popUp);
  };

  if (popUp) {
    document.body.classList.add("stop-scroll");
  } else {
    document.body.classList.remove("stop-scroll");
  }
  return (
    <>
      <div className=" shadow1 p-2 mb-5 bg-white rounded fixed-top">
        <nav
          className="navbar navbar-expand-sm navbarBg container1 "
          aria-label="Third navbar example"
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand p-22px  logo text-info1 fw-bold"
              href="#home"
              to="/"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              PakSiaL
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample03"
              aria-controls="navbarsExample03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="hover navbar-collapse collapse"
              id="navbarsExample03"
            >
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item mx-2">
                  <Link
                    to="/aboutSec"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="nav-link active p-22px"
                    aria-current="page"
                  >
                    Our Mission
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    to="/nfts"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="nav-link active p-22px"
                    aria-current="page"
                  >
                    Nfts
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    to="/aboutSec"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="nav-link active p-22px"
                    aria-current="page"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <a
                    className="nav-link active p-22px"
                    aria-current="page"
                    href="#HowItWorks"
                  >
                    How It Works?
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    to="/faqs"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="nav-link active p-22px"
                    aria-current="page"
                  >
                    FAQS
                  </Link>
                </li>
              </ul>
              <button
                className="btn btn-info1 text-white ms-auto px-5 me-5"
                // onClick={handleClick}
                onClick={connectWalletHandler }
              >
                Wallet
              </button>
              {/* {balance !== null && <p>Balance: {balance}</p>}
              {account && <p>Account: {account}</p>}
              {error && <p>Error: {error}</p>} */}
              <Link
                to="/myProfile"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="btn  border p-2 text-white mt-md-2 mt-lg-0 mx-lg-1"
              >
                <img src={Img} style={profile} alt="" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div>{popUp ? <Modal setPopUp={setPopUp} /> : ""}</div>
    </>
  );
}

export default Navbar;
