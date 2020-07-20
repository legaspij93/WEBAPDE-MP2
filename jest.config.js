module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/node_modules/**',
    ],
    automock: false,
    // "preset": "@shelf/jest-mongodb"
};