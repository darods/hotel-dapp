var HotelRooms = artifacts.require("./HotelRooms.sol");

module.exports = function(deployer) {
  deployer.deploy(HotelRooms);
};
