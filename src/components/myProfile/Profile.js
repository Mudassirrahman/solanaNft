import React, { useState } from "react";
import { ethers } from "ethers";
import "./profile.css";
import Card from "../nftsCards/NftsCard";

import img from "../../assets/images/profileH.png";
import img1 from "../../assets/images/new.png";
import img2 from "../../assets/images/share.svg";
import NftsCard from "../nftsCards/NftsCard";

const imgSize = {
  width: "170px",
  height: "170px",
};
const imgSize1 = {
  width: "18px",
  height: "18px",
};
const cardWidth = {
  width: "23%",
};
export default function Profile() {
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

  return (
    <div className="profile h-auto m">
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-12">
            <img src={img} alt="" />
          </div>
        </div>
      </div>

      <div className="container1 border-bottom">
        <div className="row ">
          <div className="col-lg-5 col-md-4">
            <img
              src={img1}
              style={imgSize}
              className="img-fluid rounded-circle ellipse "
              alt=""
            />
            <div className="d-flex align-items-center">
              <h1 className="h1-28" onClick={connectWalletHandler}>User_name </h1>
              <img src={img2} style={imgSize1} className="ms-5" alt="" />
            </div>
            {account && <p className="p-20 mt-2">Account: <span className="text-info">{account} </span> </p>}
            {/* <p className="p-20 mt-2">
              Address: <span className="text-info">56df78d....45dx</span>{" "}
            </p> */}
              {balance !== null && <p>Balance: {balance}</p>}
              {error && <p>Error: {error}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 d-flex justify-content-between col-lg-3 ">
            <a
              href=""
              className="p-22 text-black text-text-decoration-underline "
            >
              Owned
            </a>
            <a href="" className="p-22 text-black text-decoration-none ">
              Owned
            </a>
            <a href="" className="p-22 text-black text-decoration-none ">
              Owned
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-evenly my-4">
          <h1 className="h1-28">My NFTs listed for sale</h1>
         <NftsCard />
        </div>
      </div>
    </div>
  );
}
