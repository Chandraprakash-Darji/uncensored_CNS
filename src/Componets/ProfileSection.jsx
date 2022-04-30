import React, { useState, useEffect } from "react";
import CupSvg from "../assets/Svg Funs/CupSvg";
import { abstract } from "../assets/indexImg";
import SearchIcon from "../assets/Svg Funs/SearchIcon";

const ProfileSection = () => {
  const [domainUser, setDomainUser] = useState("");
  const [fetchedTranscationMATIC, setFetchedTranscationMATIC] = useState();
  const [fetchedBalMATIC, setFetchedBalMATIC] = useState();
  const [fetchedBalETH, setFetchedBalETH] = useState();
  const [fetchedTranscationETH, setFetchedTranscationETH] = useState();
  const [error, setError] = useState(null);
  const [isSearching, setisSearching] = useState(false);
  const [isData, setIsData] = useState(false);
  const tokenADD = {
    eth: "0x992dac69827A200BA112A0303Fe8F79F03c37D9d",
    poly: "0xa79E63e78Eec28741e711f89A672A4C40876Ebf3",
  };

  const handleChangeDomain = (e) => {
    setDomainUser(e.target.value);
  };
  const fetchTras = async (tokenADD, netTYPE) => {
    const transAPI = `https://api.covalenthq.com/v1/1/address/${tokenADD}/transactions_v2/?key=ckey_b5fe87a094e94579aeb92e9093f`;

    try {
      const response = await fetch(transAPI);
      const data = await response.json();

      if (netTYPE === "poly") setFetchedTranscationMATIC(data);
      else if (netTYPE === "eth") setFetchedTranscationETH(data);
      else throw new Error("Wrong Network Type");
    } catch (error) {
      setError(error);
    }
  };
  const fetchBAL = async (tokenADD, netTYPE) => {
    const BalApi = `https://api.polygonscan.com/api?module=account&action=balance&address=${tokenADD}&apikey=B8SHTA2XXNDAVQP2ZXJ26WX6J9R72HIY42`;

    try {
      const response = await fetch(BalApi);
      const data = await response.json();
      if (netTYPE === "poly") setFetchedBalMATIC(data);
      else if (netTYPE === "eth") setFetchedBalETH(data);
      else throw new Error("Wrong Network Type");
    } catch (error) {
      setError(error);
    }
  };

  const fetchEverything = async () => {
    await fetchTras(tokenADD.eth, "eth");
    await fetchTras(tokenADD.poly, "poly");
    await fetchBAL(tokenADD.eth, "eth");
    await fetchBAL(tokenADD.poly, "poly");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setisSearching(true);
    e.target.querySelector("#search").blur();
    fetchEverything();
    console.log(
      fetchedTranscationMATIC,
      fetchedBalMATIC,
      fetchedTranscationETH,
      fetchedBalETH
    );
    setisSearching(false);
    setIsData((prevState) => setIsData(!prevState));
  };
  return (
    <section>
      <div
        style={{ backgroundImage: `url(${abstract})` }}
        className="h-72 bg-cover bg-center text-gray-50 flex justify-center items-center px-4 border-0 border-y border-white/20"
      >
        <div className="container mx-auto flex flex-col gap-4 -translate-y-8 justify-center text-center">
          <h1 className="text-2xl font-bold">
            Token Explorer By Uncensored CNS
          </h1>
          <form
            className="relative flex self-center"
            onSubmit={handleFormSubmit}
          >
            <input
              type="search"
              id="search"
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 max-w-2xl rounded-l-lg min-w-[24rem]"
              placeholder="Search by Domain"
              required
              value={domainUser}
              onChange={handleChangeDomain}
            />
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm p-4 rounded-r-lg">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto py-2">
        <div className="bg-gray-50/10 border border-white/30 backdrop-blur flex flex-col justify-center items-center rounded-lg -mt-10 py-10 px-4">
          {isData ? (
            <RenderData
              fetchedTranscationMATIC={fetchedTranscationMATIC}
              fetchedTranscationETH={fetchedTranscationETH}
              fetchedBalETH={fetchedBalETH}
              fetchedBalMATIC={fetchedBalMATIC}
            />
          ) : (
            <>
              <CupSvg />
              <span className="text-[#ff9c08] font-bold text-xl mt-5">
                Chill And Search For the Account Info
              </span>
            </>
          )}
          {error ? (
            <span className="font-bold text-gray-50 text-xl">{error}</span>
          ) : (
            ""
          )}
          {isSearching ? (
            <span className="font-bold text-gray-50 text-xl">Loading...</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;

const RenderData = ({
  fetchedTranscationMATIC,
  fetchedTranscationETH,
  fetchedBalETH,
  fetchedBalMATIC,
}) => {
  if (
    (fetchedTranscationMATIC,
    fetchedTranscationETH,
    fetchedBalETH,
    fetchedBalMATIC)
  )
    return (
      <div className="text-gray-50">
        <h2 className="inline-flex gap-2">
          <span>MATIC Coin Address</span>
          <span className="font-bold">
            {fetchedTranscationMATIC.data.address}
          </span>
        </h2>
        <h2 className="inline-flex gap-2">
          <span>MATIC Coin Balance</span>
          <span className="font-bold">
            {+fetchedBalMATIC.result * 0.00000000000000000001}
          </span>
        </h2>
        <div className="my-5 border border-gray-50/30 " />
        <h2 className="inline-flex gap-2">
          <span>Etherium Coin Address</span>
          <span className="font-bold">
            {fetchedTranscationETH.data.address}
          </span>
        </h2>
        <h2 className="inline-flex gap-2">
          <span>Etherium Coin Balance</span>
          <span className="font-bold">
            {+fetchedBalETH.result * 0.00000000000000000001}
          </span>
        </h2>
        <div className="my-5 border border-gray-50/30 " />
        
      </div>
    );
  else {
    return <h2 className="text-gray-50 text-3xl">Loading...</h2>;
  }
};
