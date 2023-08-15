// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ZombieFactory is Ownable {
    event Log(Zombie[]);
    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16; // 僵尸dna
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;

    struct Zombie {
        // 僵尸结构体
        string name;
        uint dna;
        uint32 level; // 等级
        uint32 readyTime; // 冷却时间
        uint16 winCount;
        uint loseCount;
    }

    Zombie[] public zombies; // 僵尸部队

    mapping(address => uint256) ownerZombieCount; // 地址拥有僵尸的数量

    mapping(uint => address) public zombieToOwner; // 僵尸拥有者的地址

    // 创建僵尸
    function _createZombie(string memory _name, uint _dna) internal {
        zombies.push(
            Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0)
        );
        uint id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        emit NewZombie(id, _name, _dna);
        emit Log(zombies);
    }

    function getZombies() public view returns (Zombie[] memory) {
        return zombies;
    }

    function getZombieNUm() public view returns (uint) {
        return zombies.length;
    }

    // 根据字符串随机生成dna
    function _generateRandomDna(
        string memory _str
    ) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }
}
