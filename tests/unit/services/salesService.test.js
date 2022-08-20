const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const productsModel = require("../../../models/productsModel");
const ProductNotFound = require('../../../errors/ProductNotFound');
const prodsArray = require('../mocks/prodsArray');

describe("services/salesService", () => {
  beforeEach(sinon.restore);

  describe("checkIfExists()", () => {
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(productsService, "checkIfExists").rejects();
      return expect(salesService.checkIfExists(1)).to.eventually.be.rejected;
    });
    it("dispara o erro específico ProductNotFound se não existir id", () => {
      sinon.stub(productsModel, 'checkIfExists').resolves(false);
      return expect(
        salesService.checkIfExists(prodsArray)
      ).to.eventually.be.rejectedWith(ProductNotFound);
    });
    it("retorna promise em caso de sucesso", () => {
      sinon.stub(productsService, "checkIfExists").resolves(true);
      return expect(salesService.checkIfExists(prodsArray)).to.eventually.be
        .undefined;
    });
  });

  describe('createSaleId()', () => {
    it('dispara erro caso o model dê pau', () => {
      sinon.stub(salesModel, 'createSaleId').rejects();
      return expect(salesService.createSaleId())
        .to.eventually.be.rejected;
    });
    it('retorna id em caso de sucesso', () => {
      sinon.stub(salesModel, "createSaleId").resolves(1);
      return expect(salesService.createSaleId())
        .to.eventually.be.equal(1);
    });
  })

  describe("create()", () => {
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(salesModel, "create").rejects();
      return expect(salesService.create({},{})).to.eventually.be.rejected;
    });
    it("retorna undefined em caso de sucesso", () => {
      sinon.stub(salesModel, "create").resolves();
      return expect(salesService.create(1, prodsArray)).to.eventually.be.undefined;
    });
  });
});
