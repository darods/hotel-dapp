const { default: Web3 } = require("web3");

const HotelRooms = artifacts.require('HotelRooms');

let instance;

beforeEach(async () => {
    instance = await HotelRooms.new();
});

contract('HotelRooms', accounts => {
    it('should have available rooms', async() => {
        let total = await instance.totalRooms();
        assert(total>0);
    });
    it('Should allow customers to buy a room reservation providing its value', async() =>{
        let room = await instance.rooms(0);
        let roomName = room[0], price = room[1];
        await instance.buyRoom(0, {from:accounts[0], value:price});
        let customerRoom = await instance.customerRooms(accounts[0], 0);
        let customerTotalRooms = await instance.customerTotalRooms(accounts[0]);
        assert(customerRoom[0], roomName);
        assert(customerRoom[1], price);
        assert(customerTotalRooms, 1);
    });

    it('should not allow customers to reserve rooms under the price', async() =>{
        let room = await instance.rooms(0);
        let price = room[1]-5000;
        try {
            await instance.buyRoom(0, {from:accounts[0], value:price});
        }catch(e){return ;}
        assert.fail();
    });

    it('should get the real balance of the contract', async()=>{
        let room = await instance.rooms(0);
        let price = room[1];

        let room2 = await instance.rooms(1);
        let price2 = room2[1];

        await instance.buyRoom(0, {from:accounts[0], value:price});
        await instance.buyRoom(1, {from:accounts[0], value:price2})

        let newHotelRoomBalace = await instance.getHotelRoomBalance();
        expect(BigInt(newHotelRoomBalace)).to.be.equal(BigInt(price) + BigInt(price2));

    });

    it('should allow customers to reedem loyalty points', async() => {
        let room = await instance.rooms(0);
        let price = room[1];


        await instance.buyRoom(0, {from: accounts[0], value:price});
        let balance = await web3.eth.getBalance(accounts[0]);
        await instance.redeemLoyaltyPoints({from:accounts[0]});
        let finalBalance = await web3.eth.getBalance(accounts[0]);

        let {loyaltyPoints} = await instance.customers(accounts[0]);
        expect(BigInt(loyaltyPoints)).to.be.equals(BigInt(0));
        expect(finalBalance > balance).to.be.true;
    })
});