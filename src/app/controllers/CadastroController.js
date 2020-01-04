import * as Yup from 'yup';
import Person from '../models/person';
import existsError from '../helpers/validator';

// address_cep = cep (sem pontos e traços)
// address = logradouro (viacep)
// address_neighbour = bairro (viacep)
// address_city = cidade.CD_MUNICIPIO_COMPLETO
// address_state = cidade.cd_ibge_uf
// address_comp = complemento (viacep) // pode digitar tmb

class CadastroController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      residencial_phone: Yup.string().required(),
      cellphone: Yup.string().required(),
      dta_nascimento: Yup.date().required(),
      email: Yup.string().required(),
      address_CEP: Yup.string().required(),
      address: Yup.string().required(),
      address_comp: Yup.string().required(),
      address_neighbour: Yup.string().required(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
    });

    const error = await existsError(schema, req.body);
    if (error) return res.status(400).json(error);

    const {
      nome,
      rg,
      cpf,
      residencial_phone,
      cellphone,
      dta_nascimento,
      email,
      address_CEP,
      address,
      address_comp,
      address_neighbour,
      address_state,
      address_city,
    } = req.body;

    const cadastro = {
      nome,
      rg,
      cpf,
      residencial_phone,
      cellphone,
      dta_nascimento,
      email,
      address_CEP,
      address,
      address_comp,
      address_neighbour,
      address_state,
      address_city,
      cod_classification: 1,
      cod_company: 1,
      cod_level: 1,
      cod_times: 1,
      cod_person_visitor: 0,
      dta_visitor: new Date(),
      data_inclusao: new Date(),
      status: 0,
      senha: '@UC2014',
      completo: 1,
    };

    const createPerson = await Person.create(cadastro);

    return res.json(createPerson);
  }
}

export default new CadastroController();
