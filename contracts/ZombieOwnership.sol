// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "./ZombieAttack.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

abstract contract ZombieOwnership is ZombieAttack, IERC721 {
    mapping(uint => address) zombieApprovals;

    using SafeMath for uint256;

    function balanceOf(
        address _owner
    ) public view override returns (uint256 _balance) {
        return ownerZombieCount[_owner];
    }

    function ownerOf(
        uint256 _tokenId
    ) public view override returns (address _owner) {
        // 2. 在这里返回 `_tokenId` 的所有者
        return zombieToOwner[_tokenId];
    }

    function _transfer(address _form, address _to, uint _tokenId) private {
        ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
        ownerZombieCount[_form] = ownerZombieCount[_form].sub(1);
        zombieToOwner[_tokenId] = _to;
        emit Transfer(_form, _to, _tokenId);
    }

    function transfer(
        address _to,
        uint256 _tokenId
    ) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(
        address _to,
        uint256 _tokenId
    ) public override onlyOwnerOf(_tokenId) {
        zombieApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(msg.sender == zombieApprovals[_tokenId]);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
