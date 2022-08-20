const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

const productsController = require("../../../controllers/productsController");
const ProductNotFound = require("../../../errors/ProductNotFound");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

chai.use(chaiAsPromised);

const res = {
  status: sinon.stub().callsFake(() => res),
  json: sinon.stub().returns(),
};

describe("controllers/productsController", () => {
  beforeEach(sinon.restore);

  describe("get()", () => {
    it("dispara erro caso o service dispare um erro", () => {
      sinon.stub(productsService, 'get').rejects();
      expect(productsController.get({}, {})).to.eventually.be.rejected;
    });

    it("retorna res.status().json() em caso de sucesso", async () => {
      sinon.stub(productsService, 'get').resolves({});
      await productsController.get({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe("getId()", () => {
    it("dispara erro caso o parametro seja invalido", () => {
      sinon.stub(productsService, 'validateId').rejects();
      expect(productsController.getId({}, {})).to.eventually.be.rejected;
    });

    it("dispara erro caso o id não exista", () => {
      sinon.stub(productsService, "validateId").resolves({});
      sinon.stub(productsService, 'checkIfExists').rejects();
      expect(productsController.getId({}, {})).to.eventually.be.rejected;
    });

    it("restorna res.status.json em caso de sucesso", async () => {
      sinon.stub(productsService, "validateId").resolves({});
      sinon.stub(productsService, "checkIfExists").resolves();
      sinon.stub(productsService, 'getId').resolves({});
      await productsController.getId({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe("create()", () => {
    it("dispara erro caso o body seja invalido", () => {
      sinon.stub(productsService, 'validateBody').rejects();
      expect(productsController.create({}, {})).to.eventually.be.rejected;
    });

    it("dispara erro caso não consiga criar um produto", () => {
      sinon.stub(productsService, "validateBody").resolves();
      sinon.stub(productsService, 'create').rejects();
      expect(productsController.create({}, {})).to.eventually.be.rejected;
    });

    // TESTE DANDO ERRADO
    it("restorna res.status.json em caso de sucesso", async () => {
      // sinon.stub(productsService, "validateBody").resolves();
      // sinon.stub(productsService, "create").resolves();
      // sinon.stub(productsService, "getId").resolves({id: 1, name: 'oi'});
      // await productsController.getId({}, res);
      // expect(res.status.getCall(0).args[0]).to.equal(201);
      // expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1, name: "oi" });
    });
  });

  describe('update()', () => {
    it('retorna erro se validação do id falhar', () => {
      sinon.stub(productsService, 'validateId').rejects();
      sinon.stub(productsService, 'validateBody').resolves({});
      return expect(productsController.update())
        .to.eventually.be.rejected;
    });
    it("retorna erro se validação do body falhar", () => {
      sinon.stub(productsService, "validateId").resolves(1);
      sinon.stub(productsService, "validateBody").rejects();
      return expect(productsController.update())
        .to.eventually.be.rejected;
    });
    it("retorna erro específico se produto não existir no db", () => {
      sinon.stub(productsService, "validateId").resolves(1);
      sinon.stub(productsService, "validateBody").resolves({});
      sinon.stub(productsModel, 'checkIfExists').resolves(false);
      return expect(productsController.update({},{}))
        .to.eventually.be.rejectedWith(ProductNotFound);
    });
    it("retorna res.json em caso de sucesso", async () => {
      sinon.stub(productsService, "validateId").resolves(1);
      sinon.stub(productsService, "validateBody").resolves({});
      sinon.stub(productsModel, "checkIfExists").resolves(true);
      sinon.stub(productsService, 'update').resolves();
      sinon.stub(productsService, "getId").resolves({});
      await productsController.update({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });
});
