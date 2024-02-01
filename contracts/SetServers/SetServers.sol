// SPDX-License-Identifier: 0BSD
pragma solidity 0.8.23;

struct Config {
    address server;
    uint32[] selectors;
    bytes init;
}

contract SetServers {

    address owner;
    
    function setServers(Config[] calldata configs) external {
        require(msg.sender == owner);
        for (uint i = 0; i < configs.length; i++) {
            Config calldata config = configs[i];
            address server = config.server;
            uint32[] calldata selectors = config.selectors;
            bytes calldata init = config.init;
            for (uint j = 0; j < selectors.length; j++) {
                uint32 selector = selectors[j]; // selector is equal to slot
                assembly { sstore(selector, server) } 
            }
            assembly { pop(call(gas(), server, 0, init.offset, init.length, 0, 0)) }
        }
    }
    
}