// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./ZombieFactory.sol";

interface KittyInterface {
    function getKitty(
        uint256 _id
    )
        external
        view
        returns (
            bool isGestating,
            bool isReady,
            uint256 cooldownIndex,
            uint256 nextActionAt,
            uint256 siringWithId,
            uint256 birthTime,
            uint256 matronId,
            uint256 sireId,
            uint256 generation,
            uint256 genes
        );
}

contract ZombieFeeding is ZombieFactory {
    KittyInterface kittyContract;

    modifier onlyOwnerOf(uint _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]); // 检查当前调用地址
        _;
    }

    // 通过传入来设置kittyContract地址
    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    // 僵尸捕猎繁殖
    function feedAndMultiply(
        uint _zombieId,
        uint _targetDna,
        string memory _species
    ) internal onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId]; // 获取当前僵尸
        require(_isReady(myZombie));

        _targetDna = _targetDna % dnaModulus;

        uint newDna = (myZombie.dna + _targetDna) / 2; // 计算dna

        if (
            keccak256(abi.encodePacked(_species)) ==
            keccak256(abi.encodePacked("kitty"))
        ) {
            newDna = newDna - (newDna % 100) + 99;
        }

        _createZombie("noName", newDna);
        _triggerCooldown(myZombie);
    }

    function getZombie() public view returns (Zombie[] memory) {
        return zombies;
    }

    // 用小猫来喂僵尸
    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;

        (, , , , , , , , , kittyDna) = kittyContract.getKitty(_kittyId);

        feedAndMultiply(_zombieId, _kittyId, "kitty");
    }

    // 设置僵尸冷却时间
    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(block.timestamp + cooldownTime);
    }

    // 判断僵尸允许猎食的时间是否已经到了
    function _isReady(Zombie storage _zombie) internal view returns (bool) {
        return _zombie.readyTime <= block.timestamp;
    }
}
