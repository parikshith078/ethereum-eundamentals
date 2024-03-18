// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    mapping(address => uint[]) addressToHeroes;

    function getHero() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function createHero(Class class) public payable {
        require(
            msg.value >= 0.05 ether,
            "Required 0.05 ether to create a Hero"
        );
    }
}
