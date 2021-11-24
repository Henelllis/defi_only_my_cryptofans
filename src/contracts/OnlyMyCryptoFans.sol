pragma solidity >=0.5.0;

contract OnlyMyCryptoFans {

  string public name = "OnlyMyCryptoFans";

  // Store Images
  uint public imageCount = 0;
  mapping(unit => Image) public images;


  struct Image {
    unit id;
    unit hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );


  //Create Images
  function uploadImage(string memory _imgHash, string memory _description) public {
    require(bytes(_description) > 0);
    require(bytes(_imgHash) > 0);
    require(msg.sender != address(0x0));

    //Increment Image Id
    imageCount++;

    //Add Image to Contract
    images[imageCount] = Image(imageCount, 'abc123', 'Hello, World', 0, msg.sender);

    //Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  }


  //Tip Owners
  function tipImageOwner(uint _id) public payable {
    //Fetch the image
    Image memory _image = images[_id];
  }


}