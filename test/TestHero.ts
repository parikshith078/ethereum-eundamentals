import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Hero calss", function() {

  async function createHero() {
    const Hero = await ethers.getContractFactory("Hero")
    const hero = await Hero.deploy()
    await hero.deployed()
  }

  let hero;
  before(async function() {
    hero = await createHero()
  })
  if (hero == undefined) {
    console.log("hero is undifined")
  }

  console.log(hero)

  it("should get a zero hero array", async function() {
    console.log(hero)
    expect(await hero.getHero().to.deep.equl([]))
  })

  it("Should fail at creating hero due to payment", async function() {
    let e;

    try {
      await hero.createHero(0, {
        value: ethers.utils.parseEther("0.4899")
      })

    } catch (err) {
      e = err
    }

    expect(e.message.includes("Required 0.05 ether to create a Hero")).to.equal(false)
  })

})
