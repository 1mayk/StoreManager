const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel");

describe("models/salesModel", () => {
  beforeEach(sinon.restore);

  describe("create()", () => {
    it("deve retornar um erro caso o db dê pau", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.create()).to.eventually.be.rejected;
    });

    it("não retorna nenhum erro em caso de sucesso", () => {
      const mockBody = { productId: 1, quantity: 10 };

      sinon.stub(connection, "query").resolves();
      // TAVA FALTANDO ESSE RETURN NOS FALSOS POSITIVOS!!!!
      return chai
        .expect(salesModel.create(1, mockBody))
        .to.eventually.be.undefined;
    });
  });

  describe("createSaleId()", () => {
    it("deve retornar um erro caso o db dê pau", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.createSaleId()).to.eventually.be.rejected;
    });

    it("retorna id em caso de sucesso", () => {
      const mockId = { insertId: 1 };
      sinon.stub(connection, "query").resolves([mockId]);
      return chai
        .expect(salesModel.createSaleId())
        .to.eventually.be.equal(mockId.insertId);
    });
  });

});
