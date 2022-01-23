import React from "react";

const Main = ({ captureFile, imageDescription, uploadImage }) => {
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
                // const description = this.imageDescription.value
                const description = imageDescription.value;
                // this.props.uploadImage(description);
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
                  ref={(input) => {
                    imageDescription = input;
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

            {/* Code ... */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
