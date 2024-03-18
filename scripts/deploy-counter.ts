
import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";

async function deployContract() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();
  return counter;
}


async function deploy() {
  const counter = await deployContract();
  return counter;
}

async function count(counter: any) {
  await counter.count()
  console.log("Counter", await counter.getCounter())
}

deploy().then(count);
