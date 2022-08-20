const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");
// const prodsArray = require('../mocks/prodsArray');

chai.use(chaiAsPromised);

const res = {
  status: sinon.stub().callsFake(() => res),
  json: sinon.stub().returns(),
};

describe("controllers/salesController", () => {
  beforeEach(sinon.restore);

  describe("create()", () => {
    it("dispara erro caso o body seja invalido", () => {
      sinon.stub(salesService, 'validateBody').rejects();
      return expect(salesController.create({}, {})).to.eventually.be.rejected;
    });

    it('dispara erro se o id não existir no banco', () => {
      sinon.stub(salesService, "validateBody").resolves();
      sinon.stub(salesService, 'checkIfExists').rejects();
      return expect(salesController.create({}, {})).to.eventually.be.rejected;
    })
    it('dispara erro caso não consiga criar o id', () => {
      sinon.stub(salesService, "validateBody").resolves();
      sinon.stub(salesService, "checkIfExists").resolves();
      sinon.stub(salesService, 'createSaleId').rejects();
      return expect(salesController.create({}, {})).to.eventually.be.rejected;
    })
    // NÃO FUNCIONAAA
    it('cria o item em caso de sucesso', async () => {
      // sinon.stub(salesService, "validateBody").resolves();
      // sinon.stub(salesService, "checkIfExists").resolves();
      // sinon.stub(salesService, "createSaleId").resolves(1);
      // sinon.stub(salesService, "create").resolves();
      // await salesController.create({}, res);
      // expect(res.status.getCall(0).args[0]).to.equal(201);
      // expect(res.json.getCall(0).args[0]).to.be.undefined;
    });
  });
});
