import React from "react";
import "./nftsCards.css";
import img from "../../assets/images/heart.svg";
import { ImDiamonds } from "react-icons/im";
import nftsCardsSectionData from "../../assets/data/nftsCardsSectionData";
import { Link } from "react-router-dom";


const imgSize = { width: "20px", height: "18.33px" };




function NftsCard() {
  return (
    <>
      <div className="container1 mt-5 mb-4">
        <div className="row flex-wrap justify-content-evenly">
          {nftsCardsSectionData.map((product) => { return (
            
            <div key={product.id} className="card1 border  card col-lg-3 col-md-3 col-sm-4 p-2 my-2 d-flex flex-column justify-content-center align-items-center ">
              <div>
           
                <div className="heart d-flex flex-column align-items-center justify-content-center rounded-3">
                  <img src={img} style={imgSize} alt="" />
                </div>
              
                <Link to={`/nfts/${product.id}`}>
                <img
                  className="img-fluid cHeight rounded-2"
                  src={product.imgSrc}
                  alt="Card image cap"
                />
                </Link>
                <div className="">
                  <p className="p-16 mt-1">{product.nftTitle}</p>
                  <p className="p-12  ">
                    <span className="text-info fw-bold mb-0">{product.author}</span>
                  </p>
                </div>
                <div className="d-flex justify-content-between bg-secondary p-1 m-0 bg-opacity-25 rounded-2">
                  <div>
                    <p className="p-16 mt-0">{product.price}</p>
                  </div>
                  <div>
                    <div className="d-flex">
                      {<ImDiamonds />}
                      <p className="p-16 mt-0">{product.pEtherium}</p>
                    </div>
                    <div>
                      <p className="text-end p-12">{product.pIndollar}</p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg w-100 justify-content-center my-2 btn-info1 height py-1 d-flex text-center text-white mx-auto px-5 text-lg-center btn-lg ">
                  Mint Now
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