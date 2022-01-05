import React, { useState } from "react";
import Web3 from "web3";
import "./App.css";
import OnlyMyCryptoFans from "../abis/OnlyMyCryptoFans.json";
import Navbar from "./Navbar";
import Main from "./Main";

const App = () => {
  const [account, setAccount] = useState("0x0");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main
        // Code...
        />
      )}
    </div>
  );
};

export default App;
