'use strict';

const assert = require('assert');
const gameHistory = require('../../../../src/services/user/hooks/game-history.js');

describe('user gameHistory hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    gameHistory()(mockHook);

    assert.ok(mockHook.gameHistory);
  });
});
