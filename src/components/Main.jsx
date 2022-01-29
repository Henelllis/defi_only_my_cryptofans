import Identicon from "identicon.js";
import React, { useState } from "react";

const Main = ({ captureFile, images, tipImageOwner, uploadImage }) => {
  const [description, setDescription] = useState("");

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <h2> Share Image </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                uploadImage(description);
              }}
            >
              <input
                type="file"
                accept=".jpeg, .jpg, .png, .bmp, .gif"
                onChange={captureFile}
                required
              />
              <div className="form-group mr-sm=2">
                <br></br>
                <input
                  id="imageDescription"
                  type="text"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Image description..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Upload!
              </button>
            </form>

            <p>&nbsp;</p>

            {images &&
              images.map((image, key) => (
                <div className="card mb-4" key={key}>
                  <div className="card-header">
                    <img
                      className="mr-2"
                      width="30"
                      height="30"
                      src={`data:image/png;base64,${new Identicon(
                        image.author,
                        30
                      ).toString()}`}
                    />
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p className="text-center">
                        <img
                          src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                        />
                      </p>
                      <p>{image.description}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        TIPS:{" "}
                        {window.web3.utils.fromWei(
                          image.tipAmount.toString(),
                          "ether"
                        )}{" "}
                        ETH
                      </small>
                      <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={image.id}
                        onClick={(event) => {
                          const tipAmount = window.web3.utils.toWei(
                            "0.1",
                            "Ether"
                          );
                          console.log(event.target.name, tipAmount);
                          tipImageOwner(event.target.name, tipAmount);
                        }}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
