const { FingerprintGenerator } = require("fingerprint-generator")
const config = require("./config.json")

function generateFingerprint() {
  const fingerprintGenerator = new FingerprintGenerator()
  const { fingerprint } = fingerprintGenerator.getFingerprint({
    devices: config.isMobile ? ["mobile"] : ["desktop"],
    operatingSystems: config.isMobile ? ["android"] : ["windows"],
    browsers: ["edge"]
  })

  // Devuelve solo las partes relevantes para fingerprintOptions
  return fingerprint
}

module.exports = generateFingerprint
