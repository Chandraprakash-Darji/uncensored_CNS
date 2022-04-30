import React, { useEffect, useState } from "react";

const GasTracker = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gas, setGas] = useState(null);
  const apiURL =
    "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=B8SHTA2XXNDAVQP2ZXJ26WX6J9R72HIY42";

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setGas(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <div className="min-h-[40rem] text-white flex flex-col text-3xl justify-center items-center">
        Error: {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="min-h-[40rem] text-white flex flex-col text-3xl justify-center items-center">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="min-h-[40rem] text-white flex flex-col  justify-center items-center">
        <h2 className="py-2 text-5xl uppercase font-bold mt-10">
          polygon Gas tracker
        </h2>
        <div className="flex gap-5 mt-5 justify-center items-center">
          <CardGas
            title={"Low"}
            price={gas.result.SafeGasPrice}
            textColor="rgb(74 222 128)"
          />
          <CardGas
            title={"Medium"}
            price={gas.result.ProposeGasPrice}
            textColor="rgb(96 165 250)"
          />
          <CardGas
            title={"High"}
            price={gas.result.FastGasPrice}
            textColor="rgb(248 113 113)"
          />
        </div>
      </div>
    );
  }
};

export default GasTracker;

const CardGas = ({ title, price, textColor }) => {
  return (
    <div className="p-6 max-w-sm bg-white/30 rounded-lg border border-gray-200/40 shadow-md">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50">
        {title}
      </h5>
      <p className="font-normal" style={{ color: textColor }}>
        {price}
      </p>
    </div>
  );
};
