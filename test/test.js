var expect = chai.expect;

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(5)).to.equal(-1);
    })
  })
});

describe('Panel', function () {
  it('should be defined', function () {
    expect(JsrRevolution.UI.Panel).to.not.be.undefined;
  })
});
