import HotelRoomsContract from "../build/contracts/HotelRooms.json";
import contract from "truffle-contract";

export default async(provider) => {
    const hotelRooms = contract(HotelRoomsContract);
    hotelRooms.setProvider(provider);

    let instance = await hotelRooms.deployed();
    return instance;
};