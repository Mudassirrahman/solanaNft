import React from "react";
import "./nftsCards.css";
import img from "../../assets/images/heart.svg";
import { ImDiamonds } from "react-icons/im";
import nftsCardsSectionData from "../../assets/data/nftsCardsSectionData";
import { Link } from "react-router-dom";
import NFTTile from "../NFTTile";
import MarketplaceJSON from "../../Marketplace.json";
import axios from "axios";
import { useState } from "react";


const imgSize = { width: "20px", height: "18.33px" };




function NftsCard() {
  const sampleData = [
    {
      id:"1",
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      id:"2",
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      id:"3",
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
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
        return item;
      })
    );

    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();
  return (
    <>
      <div className="container1 mt-5 mb-4">
        <div className="row flex-wrap justify-content-evenly">
        {/* {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })} */}

          {data.map((data) => { return (
            
            <div key={data.id} className="card1 border  card col-lg-3 col-md-3 col-sm-4 p-2 my-2 d-flex flex-column justify-content-center align-items-center ">
              <div>
           
                <div className="heart d-flex flex-column align-items-center justify-content-center rounded-3">
                  <img src={img} style={imgSize} alt="" />
                </div>
              
                <Link to={`/nfts/${data.id}`}>
                <img
                  className="img-fluid cHeight rounded-2"
                  src={data.image}
                  alt="Card image cap"
                />
                </Link>
                <div className="">
                  <p className="p-16 mt-1">{data.name}</p>
                  <p className="p-12  ">
                    <span className="text-info fw-bold mb-0">{data.address}</span>
                  </p>
                </div>
                <div className="d-flex justify-content-between bg-secondary p-1 m-0 bg-opacity-25 rounded-2">
                  <div>
                    <p className="p-16 mt-0">{data.price}</p>
                  </div>
                  <div>
                    <div className="d-flex">
                      {<ImDiamonds />}
                      <p className="p-16 mt-0">{data.pEtherium}</p>
                    </div>
                    <div>
                      <p className="text-end p-12">{data.pIndollar}</p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg w-100 justify-content-center my-2 btn-info1 height py-1 d-flex text-center text-white mx-auto px-5 text-lg-center btn-lg ">
                  Buy now
                </button>
              </div>
            </div>
          )})}
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn fw-bold btn-lg  border-primary1 text-info1 px-5 mb-5 py-2 mt-3  rounded-2">
            See more
          </button>
        </div>
      </div>
    </>
  );
}

export default NftsCard;