// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.7.0 <0.9.0;


// //openzepplin imports 
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";


// //smart contract
// contract Metaverse is ERC721, Ownable{

//     constructor() ERC721("META","METATHREE"){}

//     //Counters to regulate the current amount of NFT Tokens minted
//     using Counters for Counters.Counter;
//     Counters.Counter private supply;

//     //total availabe NFTs
//     uint256 public maxSupply = 100;

//     //cost to be paid to create NFT token
//     uint256 public cost = 1 ether;

//     //store Owner and it's properties in metaverse
//     mapping(address => Building[]) NFTOwners;

//     //metaverse building
//     struct Building{
//         string name;
//         int8 h;
//         int8 w;
//         int8 d;
//         int8 x;
//         int8 y;
//         int8 z;
//     }

//     //list of buildings
//     Building[] public buildings;

//     //total NFTs created in metaverse
//     function getBuilding() public view returns (Building[] memory){
//         return buildings;
//     }

//     //current NFTs in metaverse
//     function totalSupply() public view returns (uint256){
//         return supply.current();
//     }

//     // Creation of the Buildings as a NFT Token in the Metaverse
//     function mint(string memory _building_name, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y, int8 _z) public payable {
//         require(supply.current() <= maxSupply, "Max supply exceeded!");
//         require(msg.value >= cost, "Insufficient funds!");
//         supply.increment();
//         _safeMint(msg.sender, supply.current());
//         Building memory _newBuild = Building(_building_name, _w, _h, _d, _x, _y, _z);
//         buildings.push(_newBuild);
//         NFTOwners[msg.sender].push(_newBuild);
//     }

//     //transfer funds from smart contract to account
//     function withdraw() external payable onlyOwner{
//         address payable _owner = payable(owner());
//         _owner.transfer(address(this).balance);
//     }

//     //obtaining metaverse building : which NFT is associated with which account
//     function getOwnerBuildings() public view returns(Building [] memory){
//         return NFTOwners[msg.sender];
//     }

// }