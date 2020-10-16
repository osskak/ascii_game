const testGameLoop = require('./gameLoop');
const assert = require('assert').strict;

describe('Test Game Loop', () => {
    it('Map should render and game must be finished without any errors', (done) => {
        const data = testGameLoop();
        const {
            totalGames,
            finished,
            initializeErrorsCount,
            renderErrorsCount,
        } = data;

        assert.strictEqual(totalGames, finished);
        assert.strictEqual(initializeErrorsCount, '0');
        assert.strictEqual(renderErrorsCount, '0');
        done();
    });
});
