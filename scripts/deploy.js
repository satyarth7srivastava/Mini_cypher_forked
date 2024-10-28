//importing the hardhat environment
const {ethers, artifacts} = require("hardhat");
const path = require("path");

async function main() {
    //get the signers
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const MyContract = await ethers.getContractFactory("DPHRS");
    const myContract = await MyContract.deploy();
    await myContract.waitForDeployment();
    const contractAddress = await myContract.getAddress();
    console.log("Contract deployed to:", contractAddress);
    //save the contract address to a file
    const fs = require("fs");
    fs.writeFileSync(path.join(__dirname, "../contract-address.txt"), contractAddress);
    //save the contract ABI to a file
    const contractAbi = (artifacts.readArtifactSync("DPHRS"));
    fs.writeFileSync(path.join(__dirname, "../contract-abi.json"), JSON.stringify(contractAbi, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });