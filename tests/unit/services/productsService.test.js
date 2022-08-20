const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const ProductNotFound = require('../../../errors/ProductNotFound');

describe('services/productsService', () => {

  beforeEach(sinon.restore);

  describe("checkIfExists()", () => {
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(productsModel, 'checkIfExists').rejects();
      expect(productsService.checkIfExists(1))
        .to.eventually.be.rejected;
    });
    it("dispara o erro específico ProductNotFound se retornar false", () => {
      sinon.stub(productsModel, 'checkIfExists').resolves(false);
      expect(productsService.checkIfExists(1))
        .to.eventually.be.rejectedWith(ProductNotFound);
    });
    it("retorna true se o retorno do model for true", () => {
      sinon.stub(productsModel, "checkIfExists").resolves(true);
      expect(productsService.checkIfExists(1)).to.eventually.be.true;
    });
  });

  describe("get()", () => {
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(productsModel, 'get').rejects();
      expect(productsService.get()).to.eventually.be.rejected;
    });
    it("retorna uma lista em caso de sucesso", () => {
      sinon.stub(productsModel, "get").resolves([]);
      expect(productsService.get())
        .to.eventually.be.equal([]);
    });
  });

  describe("getId()", () => {
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(productsModel, "getId").rejects();
      expect(productsService.getId()).to.eventually.be.rejected;
    });
    it("retorna um item em caso de sucesso", () => {
      sinon.stub(productsModel, "getId").resolves([[]]);
      expect(productsService.getId(1)).to.eventually.be.undefined;
    });
  });

  describe("create()", () => {
    const mockBody = { name: "product" };
    it("dispara um erro caso o model dê pau", () => {
      sinon.stub(productsModel, "create").rejects();
      expect(productsService.create(mockBody)).to.eventually.be.rejected;
    });
    it("retorna o id em caso de sucesso", () => {
      sinon.stub(productsModel, "create").resolves(1);
      expect(productsService.create(mockBody))
        .to.eventually.be.equal(1);
    });
  });

  describe('update()', () => {
    it('retorna erro caso o model dê pau', () => {
      sinon.stub(productsModel, 'update').rejects();
      return expect(productsService.update())
        .to.eventually.be.rejected;
    });
    it('retorna undefined em caso de sucesso', () => {
      sinon.stub(productsModel, 'update').resolves();
      return expect(productsService.update())
        .to.eventually.be.undefined;
    });
  })

});
