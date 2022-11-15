pragma solidity >=0.4.22 <0.9.0;

contract HotelRooms{
    address public owner;

    struct Customer{
        uint loyaltyPoints;
        uint totalRooms;
    }

    struct Room{
        string name;
        uint price;
    }

    uint etherPerPoint = 0.5 ether;

    Room[] public rooms;
    
    mapping(address => Customer) public customers;

    mapping(address => Room[]) public customerRooms;

    mapping(address => uint) public customerTotalRooms;

    event RoomPurchased(address indexed customer, uint price);

    constructor() public{
        owner = msg.sender; 
        rooms.push(Room('Habitacion 1', 6 ether));
        rooms.push(Room('Habitacion 2', 7 ether));
        rooms.push(Room('Habitacion Premium 1', 14 ether));
    }

    function buyRoom(uint roomIndex) public payable{
        Room memory room = rooms[roomIndex];
        require(msg.value == room.price);
        Customer storage customer = customers[msg.sender];
        customer.loyaltyPoints += 5;
        customer.totalRooms +=1;
        customerRooms[msg.sender].push(room);
        customerTotalRooms[msg.sender] ++;

        emit RoomPurchased(msg.sender, room.price);
    }

    function totalRooms() public view returns (uint){
        return rooms.length;
    }

    function redeemLoyaltyPoints() public payable{
        Customer storage customer =customers[msg.sender];
        uint etherToRefund = etherPerPoint * customer.loyaltyPoints;
        msg.sender.transfer(etherToRefund);
        customer.loyaltyPoints = 0;
    }

    function getfundableEther() public view returns (uint){
        return etherPerPoint * customers[msg.sender].loyaltyPoints;
    }

    function getHotelRoomBalance() public view isOwner returns (uint){
        address hotelRoomAddres = address(this);
        return hotelRoomAddres.balance;
    }
    modifier isOwner(){
        require(msg.sender == owner);
        _;
    }
}