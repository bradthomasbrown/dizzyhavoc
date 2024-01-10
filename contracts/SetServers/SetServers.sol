// SPDX-License-Identifier: 0BSD
pragma solidity 0.8.23;

struct Config {
    address server;
    uint32[] selectors;
}

contract SetServers {
    function setServers(Config[] calldata configs) external {
        require(msg.sender == 0xC9c423f875677351ab79C058eD1C38F2b36061a4);
        for (uint i = 0; i < configs.length; i++) {
            Config calldata config = configs[i];
            address server = config.server;
            uint32[] calldata selectors = config.selectors;
            for (uint j = 0; j < selectors.length; j++) {
                uint32 selector = selectors[j]; // selector is equal to slot
                assembly { sstore(selector, server) } 
            }
        }
    }
}