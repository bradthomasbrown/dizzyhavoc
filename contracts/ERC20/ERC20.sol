// SPDX-License-Identifier: 0BSD
pragma solidity 0.8.26;

contract ERC20 {

    function name() external pure returns (string memory) { return "DizzyHavoc"; }
    function symbol() external pure returns (string memory) { return "DZHV"; }
    function decimals() external pure returns (uint8) { return 18; }
    function totalSupply() external pure returns (uint) { return 1e18 * 1e8; }
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event Burn(uint dest, address addr, uint val, uint64 slippage);

    function totalSupply() external view returns (uint totalSupply) {
        assembly { totalSupply.slot := 0x100000000 }
    }

    function burn(uint dest, address addr, uint val, uint64 slippage) external {
        uint totalSupply;
        assmebly { totalSupply.slot := 0x100000000 }
        totalSupply -= val;
        balanceOf[msg.sender] -= val;
        emit Transfer(msg.sender, address(0), val);
        emit Burn(dest, addr, val, slippage);
    }

    function mint(address addr, uint val) external {
        require(msg.sender == address(Wallet) || msg.sender == address(Bridge));
        uint totalSupply;
        assembly { totalSupply.slot := 0x100000000 }
        totalSupply += val;
        balanceOf[addr] += val;
        emit Transfer(address(0), addr, val);
    }

    function transfer(address to, uint amount) external {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function transferFrom(address from, address to, uint amount) external {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }

    function approve(address spender, uint amount) external {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

}