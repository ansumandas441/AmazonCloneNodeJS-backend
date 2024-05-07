module.exports = {
    // other Jest configurations...
    testPathIgnorePatterns: [
      '/node_modules/', // Ignore all files inside node_modules directory
      './test/mochaTest/*' // Ignore a specific file
    ]
  };