import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import hotelRoomsContract from "./hotelRooms";

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: undefined
        };
    }

    async componentDidMount(){
        this.web3 = await getWeb3();
        this.hotelRooms = await hotelRoomsContract(this.web3.currentProvider);
        console.log(this.hotelRooms.buyRoom);
        var account = (await this.web3.eth.getAccounts())[0];
        
        this.setState({
            account: account.toLowerCase()
        }, ()=> {
            this.load();
        });
    }

    async getBalace(){
        let weiBalance = await this.web3.eth.getBalace(this.state.account);
        this.setState({
            balance: weiBalance
        });
    }
    async load(){
        this.getBalace();
    }

    async connectionWallet(){
        accounts = await window.ethereum.request({method: "eth_requestAccounts"}).catch((err)=>{console.log(err.code)})
    }
    

    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h4 className="display-4">¡Bienvenido al Hotel!</h4>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Balance">
                        <p>{this.state.account}</p>
                        <span>Balance del hotel: {this.state.balance}</span>
                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Puntos de fidelidad - refundable ether">

                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Habitaciones disponibles">


                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Tus habitaciones reservadas">

                    </Panel>
                </div>
            </div>
        </React.Fragment>
    }
}