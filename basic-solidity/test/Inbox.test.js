const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async()=> {
    // get a list of all accounts
    // all web3 functions are async/await or return promise
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({ data: bytecode, arguments: ['Hi there!'] })
                .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox', ()=> {
    it('deploy a contract', ()=> {
        assert.ok(inbox.options.address);
        // console.log( inbox )
    });
});



























/*
    class Car{
        park(){
            return 'stopped'
        }

        drive(){
            return 'vroom'
        }
    }

    let car;

    beforeEach(()=> {
        car = new Car()
    })

    describe('Car', ()=> {
        it('can park', ()=> {
            assert.equal(car.park(), 'stopped')
        })

        
        it('can drive', ()=> {
            assert.equal(car.drive(), 'vroom')
        })
    })
*/