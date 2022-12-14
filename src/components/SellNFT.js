
import { useState } from "react";
import { Link } from "react-router-dom";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",   
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  console.log("Working", process.env);
  return (
    <div className="container1">

      <div className="d-flex text-start mt-5" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-purple-500 mb-8">
          Mint new NFT
          </h3>
          <div className="my-5 d-flex flex-column">
            <label
              className="block text-purple-500 text-sm font-bold"
              htmlFor="name"
            >
              NFT Name
            </label>
            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Axie#4563"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            />
          </div>
          <div className="mb-5 d-flex flex-column">
            <label
              className="text-purple-500 text-sm font-bold"
              htmlFor="description"
            >
              NFT Description
            </label>
            <p className=" text-secondary w-75 my-3">The description will be included on the item's detail page underneath its image.
               What are its unique features & how it is different?</p>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Axie Infinity Collection"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            />
          </div>
          <div className="mb-5 d-flex flex-column ">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price (in ETH)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            />
          </div>
          <div className="d-flex flex-column">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
             Image, GIF, 3D Model, or Video *
            </label>
            <input className="" type={"file"} onChange={OnChangeFile} />
          </div>
          <br></br>
          <div className="text-green text-center">{message}</div>
          <button
            onClick={listNFT}
            className="btn btn-info1 text-white px-5"
          >
           Mint Now
          </button>
        </form>
      </div>
      <div className="text-center my-5 ">
        <Link to={"/"}><button className="btn btn-info1 text-white btn-lg px-5 ">back to Home</button></Link>
        </div>
    </div>
  );
}
