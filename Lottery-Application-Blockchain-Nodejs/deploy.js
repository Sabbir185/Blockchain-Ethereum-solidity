const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const dotenv = require('dotenv')
dotenv.config();

const provider = new HDWalletProvider(
    `${process.env.NEMENIC}`,
    `${process.env.INFURA}`
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ', accounts[1]);
    
    const  result = await new web3.eth.Contract(JSON.parser(interface))
                        .deploy({ data: bytecode })
                        .send({ from: accounts[1], gas: '1000000' });

    console.log("Contract deployed to: ", result.options.address);

    provider.engine.stop();
};

deploy();