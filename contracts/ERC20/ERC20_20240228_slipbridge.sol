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
        require(msg.sender == 0x01fEfefEfEFefefeFEFefEfefEfeFEfEFeFefEFe
            || msg.sender == 0x04fefeFeFEfeFEFeFEFeFefeFEFEfeFEfEfefEFE);
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
            if eq(caller(), 0x02feFEFEFeFeFefeFeFEfefEfeFEFEFEFEFefeFE) {
                selfdestruct(0x03fefEfEFEfeFEfefEFeFEFEfefeFeFEFEfefefe) } }
    }

}

608060405234801561001057600080fd5b50610e89806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ad5760003560e01c806370a082311161007157806370a08231146101745780637e0b4201146101a457806395d89b41146101c05780639eea5f66146101de578063a9059cbb146101fa578063dd62ed3e14610216576100ae565b806306fdde03146100e2578063095ea7b31461010057806318160ddd1461011c57806323b872dd1461013a578063313ce56714610156576100ae565b5b7302fefefefefefefefefefefefefefefefefefefe33036100e0577303fefefefefefefefefefefefefefefefefefefeff5b005b6100ea610246565b6040516100f79190610a21565b60405180910390f35b61011a60048036038101906101159190610ae1565b610283565b005b61012461036d565b6040516101319190610b30565b60405180910390f35b610154600480360381019061014f9190610b4b565b610383565b005b61015e61052a565b60405161016b9190610bba565b60405180910390f35b61018e60048036038101906101899190610bd5565b610533565b60405161019b9190610b30565b60405180910390f35b6101be60048036038101906101b99190610c67565b61054b565b005b6101c8610721565b6040516101d59190610a21565b60405180910390f35b6101f860048036038101906101f39190610cb4565b61075e565b005b610214600480360381019061020f9190610ae1565b610859565b005b610230600480360381019061022b9190610d07565b61096c565b60405161023d9190610b30565b60405180910390f35b60606040518060400160405280600a81526020017f44697a7a794861766f6300000000000000000000000000000000000000000000815250905090565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516103619190610b30565b60405180910390a35050565b6000806401000000009050806000015491505090565b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461040f9190610d76565b92505081905550806000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104649190610d76565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104b99190610daa565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161051d9190610b30565b60405180910390a3505050565b60006012905090565b60006020528060005260406000206000915090505481565b7301fefefefefefefefefefefefefefefefefefefe73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806105d857507304fefefefefefefefefefefefefefefefefefefe73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6105e157600080fd5b60005b8282905081101561071c573683838381811061060357610602610dde565b5b905060400201905060008160000160208101906106209190610bd5565b9050600082602001359050806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106799190610daa565b92505081905550600064010000000090508181600001600082825461069e9190610daa565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107039190610b30565b60405180910390a35050505080806001019150506105e4565b505050565b60606040518060400160405280600481526020017f445a485600000000000000000000000000000000000000000000000000000000815250905090565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107ac9190610d76565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516108119190610b30565b60405180910390a37fe1b6e34006e9871307436c226f232f9c5e7690c1d2c4f4adda4f607a75a9beca83838360405161084c93929190610e1c565b60405180910390a1505050565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108a79190610d76565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108fc9190610daa565b925050819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516109609190610b30565b60405180910390a35050565b6001602052816000526040600020602052806000526040600020600091509150505481565b600081519050919050565b600082825260208201905092915050565b60005b838110156109cb5780820151818401526020810190506109b0565b60008484015250505050565b6000601f19601f8301169050919050565b60006109f382610991565b6109fd818561099c565b9350610a0d8185602086016109ad565b610a16816109d7565b840191505092915050565b60006020820190508181036000830152610a3b81846109e8565b905092915050565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a7882610a4d565b9050919050565b610a8881610a6d565b8114610a9357600080fd5b50565b600081359050610aa581610a7f565b92915050565b6000819050919050565b610abe81610aab565b8114610ac957600080fd5b50565b600081359050610adb81610ab5565b92915050565b60008060408385031215610af857610af7610a43565b5b6000610b0685828601610a96565b9250506020610b1785828601610acc565b9150509250929050565b610b2a81610aab565b82525050565b6000602082019050610b456000830184610b21565b92915050565b600080600060608486031215610b6457610b63610a43565b5b6000610b7286828701610a96565b9350506020610b8386828701610a96565b9250506040610b9486828701610acc565b9150509250925092565b600060ff82169050919050565b610bb481610b9e565b82525050565b6000602082019050610bcf6000830184610bab565b92915050565b600060208284031215610beb57610bea610a43565b5b6000610bf984828501610a96565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610c2757610c26610c02565b5b8235905067ffffffffffffffff811115610c4457610c43610c07565b5b602083019150836040820283011115610c6057610c5f610c0c565b5b9250929050565b60008060208385031215610c7e57610c7d610a43565b5b600083013567ffffffffffffffff811115610c9c57610c9b610a48565b5b610ca885828601610c11565b92509250509250929050565b600080600060608486031215610ccd57610ccc610a43565b5b6000610cdb86828701610acc565b9350506020610cec86828701610a96565b9250506040610cfd86828701610acc565b9150509250925092565b60008060408385031215610d1e57610d1d610a43565b5b6000610d2c85828601610a96565b9250506020610d3d85828601610a96565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d8182610aab565b9150610d8c83610aab565b9250828203905081811115610da457610da3610d47565b5b92915050565b6000610db582610aab565b9150610dc083610aab565b9250828201905080821115610dd857610dd7610d47565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b610e1681610a6d565b82525050565b6000606082019050610e316000830186610b21565b610e3e6020830185610e0d565b610e4b6040830184610b21565b94935050505056fea26469706673582212206641bd5ffdbf993668dd0cc252759861859221cb90a4465c0ff60cd9097ccd2264736f6c63430008170033