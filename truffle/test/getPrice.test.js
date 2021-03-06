const CryptoMarketplace = artifacts.require("CryptoMarketplace");
const expect = require('chai').expect;

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

contract('FundRaise', function ([owner, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9]) {
    let cryptoMarketplace
    beforeEach('setup contract for each test', async function () {
        cryptoMarketplace = await CryptoMarketplace.new()
    });

    it("normal test get price", async () => {
        const ID = encrypt("Domati:" + "2.00");
        await cryptoMarketplace.newProduct(ID, "Domati", 2, 1);
        let price = await cryptoMarketplace.getPrice.call(ID, 1);
        expect(price.toString()).to.be.equal("2", "Product price is not correct!");
    });

    it("check with wrong id", async () => {
        const ID = encrypt("Domati:" + "2.00");
        await cryptoMarketplace.newProduct(ID, "Domati", 2, 1);
        await cryptoMarketplace.getPrice.call(encrypt("koko"), 2).should.be.rejectedWith("revert");
    })

})