import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import OnlyMyCryptoFans from "../abis/OnlyMyCryptoFans.json";
import Navbar from "./Navbar";
import Main from "./Main";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const App = () => {
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non Ethereum Browser detected. you should try out Meta Mask"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    console.log("ACCOUNTS , ", accounts);
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = OnlyMyCryptoFans.networks[networkId];
    if (networkData) {
      const onlyMyCryptoFansContract = web3.eth.Contract(
        OnlyMyCryptoFans.abi,
        networkData.address
      );
      setOnlyMyCryptoFansContract(onlyMyCryptoFansContract);
      const imageCount = await onlyMyCryptoFansContract.methods
        .imageCount()
        .call();
      setImageCount(imageCount);
      console.log("imageCount", imageCount);
      const imageCollection = [];
      for (let i = 1; i <= imageCount; i++) {
        const image = await onlyMyCryptoFansContract.methods.images(i).call();
        console.log("image", image);
        imageCollection.push(image);
        console.log("setImages ", setImages);
      }
      setImages(imageCollection);

      setLoading(false);
    } else {
      window.alert(
        "OnlyMyCryptoFans has not been deployed to detected network :("
      );
    }
  }

  const captureFile = (event) => {
    event.preventDefault();
    console.log("event.target", event.target.files[0]);
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log("buffer", reader.result);

      setStateBuffer(Buffer.from(new Uint8Array(reader.result)));
      console.log("buffer", stateBuffer);
    };
  };

  const uploadImage = (description) => {
    console.log("Submitting file to ipfs... with ", typeof stateBuffer);

    ipfs.add(stateBuffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }
      setLoading(true);
      onlyMyCryptoFansContract.methods
        .uploadImage(result[0].hash, description)
        .send({ from: account })
        .on("transactionHash", () => {
          setLoading(false);
        });
    });
  };

  const tipImageOwner = (id, tipAmount) => {
    setLoading(true);
    onlyMyCryptoFansContract.methods
      .tipImageOwner(id)
      .send({ from: account, value: tipAmount })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);

  const [account, setAccount] = useState("0x0");
  const [loading, setLoading] = useState(true);
  const [stateBuffer, setStateBuffer] = useState();

  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  const [onlyMyCryptoFansContract, setOnlyMyCryptoFansContract] = useState(
    null
  );

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main
          captureFile={captureFile}
          uploadImage={uploadImage}
          images={images}
          tipImageOwner={tipImageOwner}
        />
      )}
    </div>
  );
};

export default App;
