const { expect } = require("chai");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe("models/productsModel", () => {
  beforeEach(sinon.restore);

  describe('checkIfExists()', () => {
    // POSSÍVEIS ERROS
    it("deve retornar um erro caso o db dê pau", async () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(productsModel.checkIfExists(1))
        .to.eventually.be.rejected;
    });

    it("deve retornar false caso o db não encontre o id", () => {
      sinon.stub(connection, "query").resolves([[]]);
      chai.expect(productsModel.checkIfExists(1))
        .to.eventually.be.false;
    });

    // CAMINHO FELIZ
    it("deve retornar true caso o db encontre o id", () => {
      sinon.stub(connection, "query").resolves([[{}]]);
      chai.expect(productsModel.checkIfExists(1))
        .to.eventually.be.true;
    });
  });

  describe('get()', () => {
    it("deve retornar um erro caso o db dê pau", () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(productsModel.get())
        .to.eventually.be.rejected;
    });

    it('deve retornar uma lista ao ser chamado corretamente', () => {
      sinon.stub(connection, 'query').resolves([]);
      chai.expect(productsModel.get())
        .to.eventually.be.undefined;
    });
  });

  describe('getId()', () => {
    it("deve retornar um erro caso o db dê pau", () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(productsModel.getId(1))
        .to.eventually.be.rejected;
    });

    it('deve retornar um item ao ser chamado corretamente', () => {
      sinon.stub(connection, 'query').resolves([[undefined]]);
      chai.expect(productsModel.getId(1))
        .to.eventually.be.undefined;
    });
  });

  describe("create()", () => {
    it("deve retornar um erro caso o db dê pau", () => {
      sinon.stub(connection, "query").rejects();
      chai.expect(productsModel.create()).to.eventually.be.rejected;
    });

    it("deve retornar o id em caso de sucesso", () => {
      const mockBody = { name: 'product' };
      const mockId = { insertId: 1 };
      sinon.stub(connection, "query").resolves([mockId]);
      chai.expect(productsModel.create(mockBody))
        .to.eventually.be.equal(mockId);
    });
  });

  describe("update()", () => {
    it('retorna erro se o db der pau', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(productsModel.update())
        .to.eventually.be.rejected;
    });
    it('não retorna nenhum erro em caso de sucesso', () => {
      sinon.stub(connection, 'query').resolves()
      return expect(productsModel.update())
        .to.eventually.be.undefined;
    });
  });

});
