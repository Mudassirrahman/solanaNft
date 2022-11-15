import React, { useState } from "react";
import { ethers } from "ethers";
import "./profile.css";
import Card from "../nftsCards/NftsCard";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../../Marketplace.json";
import axios from "axios";
import NFTTile from "../NFTTile";
import img from "../../assets/images/profileH.png";
import img1 from "../../assets/images/new.png";
import img2 from "../../assets/images/share.svg";
import NftsCard from "../nftsCards/NftsCard";
import ProfileCard from "../../components/nftsCards/ProfileCard";

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
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

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
              <h1 className="h1-28">User_name </h1>
              <img src={img2} style={imgSize1} className="ms-5" alt="" />
            </div>
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
          {/* <NftsCard /> */}
          {data.map((value, index) => {
            return <ProfileCard thedata={value} key={index}></ProfileCard>;
          })}
        </div>
      </div>
    </div>
  );
}
