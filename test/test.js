var expect = require('chai').expect;
import FlatFileDb from '../src/flat-file-db';

describe('index', function () {
  it('should export a function', function () {
    expect(FlatFileDb('./db.json')).to.be.a('class');
  });
});
