// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {
    uint randNonce = 0; // 随机数

    uint attackVictoryProbability = 70; // 胜利的概率

    function randMod(uint _modulus) internal returns (uint) {
        // 生成随机数的函数
        randNonce++;
        return
            uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function attack(
        uint _zombieId,
        uint _targetId
    ) external onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId];
        Zombie storage enemyZombie = zombies[_targetId];

        uint rand = randMod(100);

        if (rand > attackVictoryProbability) {
            // 赢
            myZombie.winCount++;
            myZombie.level++;
            enemyZombie.loseCount++;
            feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
        } else {
            // 输
            myZombie.loseCount++;
            enemyZombie.winCount++;
            _triggerCooldown(myZombie);
        }
    }
}
