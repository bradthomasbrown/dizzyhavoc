// SPDX-License-Identifier: 0BSD
pragma solidity 0.8.23;

contract Deployer {
    address public implementation;
    function deploy(bytes calldata code) external payable {
        assembly {
            calldatacopy(0, 0, code.length)
            sstore(implementation.slot, create(0, 0, code.length))
            mstore(0, 0x635c60da1b345260203460043434335af134513b80343434513c34f3)
            pop(create2(0, 0, 0x1c, callvalue()))
        }
    }
}