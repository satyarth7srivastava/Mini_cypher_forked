const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DphrsModule", (m) => {
  // No constructor parameters for DPHRS
  const dphrs = m.contract("DPHRS");

  return { dphrs };
});
