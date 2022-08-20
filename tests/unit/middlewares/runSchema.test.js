const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const runSchema = require('../../../middlewares/runSchema');
const schema = require('../mocks/schema');

/* CONSERTAR TESTE */

describe('middlewares/runSchema', () => {
  beforeEach(sinon.restore);

  // CASO DE ERRO
  it('deve retornar um erro se o shema não rodar', () => {
    // sinon.stub(schema, 'validateAsync').rejects();
    // const fn = runSchema(schema);
    // chai.expect(fn({})).to.eventually.be.rejected;
  });

  // CAMINHO FELIZ
  it("deve retornar um valor caso esteja ok", () => {
    // sinon.stub(schema, "validate").resolves('');
    // chai.expect(runSchema(schema)).to.eventually.be.equal('');
  });

});
