import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "solidity-coverage";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  paths: {
    artifacts: "../client/artifacts",
  },

};

export default config;
