// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "./ZombieAttack.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ZombieOwnership is ZombieAttack, IERC721 {
    mapping(uint => address) zombieApprovals;
    mapping(address => mapping(address => bool)) public operatorApprovals; // 授权所有 NFT 的账本  NFT 持有者 => 被授权者 => 是否授权

    using SafeMath for uint256;

    // balanceOf：返回某地址的NFT持有量balance。√√√√
    // ownerOf：返回某tokenId的主人owner。√√√√
    // approve：授权另一个地址使用你的NFT。参数为被授权地址approve和tokenId。√√√√
    // transferFrom：普通转账，参数为转出地址from，接收地址to和tokenId。
    // safeTransferFrom：安全转账（如果接收方是合约地址，会要求实现ERC721Receiver接口）。参数为转出地址from，接收地址to和tokenId。
    // safeTransferFrom：安全转账的重载函数，参数里面包含了data。
    // getApproved：查询tokenId被批准给了哪个地址。
    // setApprovalForAll：将自己持有的该系列NFT批量授权给某个地址operator。
    // isApprovedForAll：查询某地址的NFT是否批量授权给了另一个operator地址。

    // 返回_owner地址的僵尸数量
    function balanceOf(
        address _owner
    ) public view override returns (uint256 _balance) {
        return ownerZombieCount[_owner];
    }

    // 返回拥有id为_tokenId的僵尸的地址
    function ownerOf(
        uint256 _tokenId
    ) public view override returns (address _owner) {
        // 2. 在这里返回 `_tokenId` 的所有者
        return zombieToOwner[_tokenId];
    }

    // 授权另一个地址_to使用_tokenId的僵尸
    function approve(
        address _to,
        uint256 _tokenId
    ) public override onlyOwnerOf(_tokenId) {
        zombieApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function _transfer(address _form, address _to, uint _tokenId) private {
        ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
        ownerZombieCount[_form] = ownerZombieCount[_form].sub(1);
        zombieToOwner[_tokenId] = _to;
        emit Transfer(_form, _to, _tokenId);
    }

    // 检查被授权者是否接收 NFT
    function _checkOnERC721Received(
        address from,
        address to,
        bytes memory _data
    ) internal returns (bool) {
        // 如果被授权者不是合约则表示接收成功
        if (to.code.length == 0) {
            return true;
        }
        // 调用被授权者的 onERC721Received 函数
        try
            IERC721Receiver(to).onERC721Received(
                msg.sender,
                from,
                zombies.length,
                _data
            )
        returns (bytes4 retval) {
            // 如果返回值为 ERC721_RECEIVED 则表示接收成功
            return retval == IERC721Receiver(to).onERC721Received.selector;
        } catch (bytes memory reason) {
            // 如果调用失败则表示接收失败
            if (reason.length == 0) {
                revert("ERC721: transfer to non ERC721Receiver implementer");
            } else {
                assembly {
                    revert(add(32, reason), mload(reason))
                }
            }
        }
    }

    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(
            _checkOnERC721Received(from, to, data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    // 安全转移 NFT  无 data 参数
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        // 调用安全转移 NFT
        _safeTransfer(from, to, tokenId, "");
    }

    // 安全转移 NFT  有 data 参数
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) public override {
        _safeTransfer(from, to, tokenId, data);
    }

    // 查询某个 NFT 的授权者
    function getApproved(
        uint256 tokenId
    ) public view override returns (address) {
        address tokenOwner = zombieToOwner[tokenId]; //  NFT 持有者
        //  NFT 持有者地址不能为0
        require(
            tokenOwner != address(0),
            "ERC721: approved query for nonexistent token"
        );
        return zombieApprovals[tokenId];
    }

    // 授权或撤销所有 NFT
    function setApprovalForAll(
        address operator,
        bool approved
    ) public override {
        // 被授权者地址不能为0
        require(operator != address(0), "ERC721: approve to the zero address");
        // 被授权者与发送者不能为同一地址
        require(operator != msg.sender, "ERC721: approve to caller");
        // 将所有 NFT 授权给被授权者
        operatorApprovals[msg.sender][operator] = approved;
        // 触发授权所有 NFT 事件
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    // 查询某个 NFT 持有者是否将所有 NFT 授权给某个地址
    function isApprovedForAll(
        address _owner,
        address operator
    ) public view override returns (bool) {
        //  NFT 持有者地址不能为0
        require(
            _owner != address(0),
            "ERC721: operator query for nonexistent token"
        );
        // 被授权者地址不能为0
        require(
            operator != address(0),
            "ERC721: operator query for nonexistent token"
        );
        return operatorApprovals[_owner][operator];
    }

    // 普通转账，参数为转出地址from，接收地址to和tokenId。
    function transferFrom(
        address _form,
        address _to,
        uint256 _tokenId
    ) public override onlyOwnerOf(_tokenId) {
        _form = msg.sender;
        _transfer(_form, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(msg.sender == zombieApprovals[_tokenId]);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
