pragma solidity >=0.5.0;

contract OnlyMyCryptoFans {

  string public name = "OnlyMyCryptoFans";

  // Store Images
  uint public imageCount = 0;
  mapping(uint => Image) public images;


  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address  author
  );

  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address  author
  );

  //Create Images
  function uploadImage(string memory _imgHash, string memory _description) public {
    require(bytes(_description).length > 0);
    require(bytes(_imgHash).length > 0);
    require(msg.sender != address(0x0));

    //Increment Image Id
    imageCount++;
    // address payable spender = msg.sender;

    //Add Image to Contract
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);

    //Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  }


  //Tip Owners
  function tipImageOwner(uint _id) public payable {
    //Make sure tip is valid
    require(_id > 0  && _id <= imageCount);

    // //Fetch the image
    Image memory _image = images[_id];

    //Fetch the author
    address payable _author = _image.author;

    // Pay the author by spending crypto
    _author.transfer(msg.value);

    //increment the tip amount
    _image.tipAmount = _image.tipAmount + msg.value;

    //Update the image
    images[_id] = _image;
    
    //Trigger event amount
    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _image.author);
  }


}