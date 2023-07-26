// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {
    uint levelUpFee = 0.001 ether;

    modifier aboveLevel(uint _level, uint _zombieId) {
        // 对僵尸在每个等级的行为约束的修饰符
        require(zombies[_zombieId].level >= _level);
        _;
    }

    function withdraw() external onlyOwner {
        // 从合约中提取以太币
        address _owner = owner();
        uint addressBalance = address(this).balance;
        payable(_owner).transfer(addressBalance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUp(uint _zombieId) external payable onlyOwnerOf(_zombieId) {
        // 僵尸付费升级
        require(msg.value == levelUpFee);

        zombies[_zombieId].level++;
    }

    function changeName(
        uint _zombieId,
        string memory _newName
    ) external onlyOwnerOf(_zombieId) aboveLevel(2, _zombieId) {
        // 僵尸到2级改名字
        zombies[_zombieId].name = _newName;
    }

    function changDna(
        uint _zombieId,
        uint _newDna
    ) external onlyOwnerOf(_zombieId) aboveLevel(20, _zombieId) {
        // 僵尸到20级改dna
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(
        address _owner
    ) external returns (uint[] memory) {
        // 获取一个账户下僵尸列表
        uint[] memory result = new uint[](ownerZombieCount[_owner]);
        emit Log(zombies);

        uint count = 0;
        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[count] = i;
                count++;
            }
        }

        return result;
    }
}
