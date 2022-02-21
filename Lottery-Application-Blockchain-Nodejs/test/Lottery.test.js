const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async()=> {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode })
            .send({ from: accounts[1], gas: '1000000' })
});

describe('Lottery Contract', ()=> {
    it('deploy test', ()=> {
        assert.ok(lottery.options.address);
    });

    it('enter one player', async ()=> {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.012', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[1]
        });

        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    })

    it('enter multiple players', async ()=> {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.012', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.012', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('0.012', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[1]
        });

        assert.equal(accounts[1], players[0]);
        assert.equal(accounts[2], players[1]);
        assert.equal(accounts[3], players[2]);
        assert.equal(3, players.length);
    })

    it('minimum amount of ether to enter', async ()=> {
        try {
            await lottery.methods.enter().send({
                from: accounts[4],
                value: 0
            });
            assert(false)
        } catch (err) {
            assert(err)
        };
    })
});