/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import Person from '../models/person';
import existsError from '../helpers/validator';

const validarCpf = require('validar-cpf');

class CadastroController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      residencial_phone: Yup.string().required(),
      cellphone: Yup.string().required(),
      dta_nascimento: Yup.date().required(),
      email: Yup.string(),
      address_CEP: Yup.string().required(),
      address: Yup.string().required(),
      address_comp: Yup.string().required(),
      address_neighbour: Yup.string().required(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
      hasDependecy: Yup.boolean().required(),
      dependencies: Yup.array(),
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
      hasDependecy,
      dependencies,
    } = req.body;

    const dtNascimento = new Date(dta_nascimento);
    const adult = differenceInYears(new Date(), dtNascimento);

    if (adult < 18) {
      return res.status(404).json({
        error: 'Você precisa ser maior de 18 anos !',
      });
    }

    const cpfValid = validarCpf(cpf);
    if (!cpfValid) {
      return res.status(404).json({ error: 'CPF Invalido, tente novamente !' });
    }

    const ultimoCadastro = await Person.findOne({
      order: [['data_inclusao', 'DESC']],
    });

    const ultimoProtocolo =
      ultimoCadastro.cod_biciletario !== null
        ? ultimoCadastro.cod_biciletario
        : 0;

    let novoProtocolo = +ultimoProtocolo + 1;
    switch (novoProtocolo.toString().length) {
      case 5:
        novoProtocolo = `0${novoProtocolo}`;
        break;
      case 4:
        novoProtocolo = `00${novoProtocolo}`;
        break;
      case 3:
        novoProtocolo = `000${novoProtocolo}`;
        break;
      case 2:
        novoProtocolo = `0000${novoProtocolo}`;
        break;
      case 1:
        novoProtocolo = `00000${novoProtocolo}`;
        break;
      default:
        break;
    }

    console.log(novoProtocolo.length);

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
      cod_biciletario: novoProtocolo,
    };

    const createPerson = await Person.create(cadastro);

    if (hasDependecy) {
      // eslint-disable-next-line guard-for-in
      for (const dependency in dependencies) {
        const dep = dependencies[dependency];
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
        } = dep;

        const schemaDep = Yup.object().shape({
          nome: Yup.string().required(),
          rg: Yup.string().required(),
          cpf: Yup.string(),
          residencial_phone: Yup.string(),
          dta_nascimento: Yup.date().required(),
        });

        // eslint-disable-next-line no-await-in-loop
        const errorDep = await existsError(schemaDep, dep);
        if (errorDep) return res.status(400).json(errorDep);

        const dtNascimentoDep = new Date(dta_nascimento);
        const adultDep = differenceInYears(new Date(), dtNascimentoDep);
        if (adultDep > 17) {
          return res.status(404).json({
            error: `Dependente ${nome} e maior de 18 anos !`,
          });
        }

        const cadastroDep = {
          cod_person_resp: createPerson.cod_person,
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
          cod_biciletario: novoProtocolo,
        };
        const personDep = await Person.create(cadastroDep);
      }
    }

    return res.json(createPerson);
  }
}

export default new CadastroController();
