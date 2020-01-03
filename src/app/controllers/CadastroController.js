import * as Yup from 'yup';

class CadastroController {
  async store(req, res) {
    const {
      nome,
      rg,
      cpf,
      dta_nascimento,
      address_comp,
      address_CEP,
      address,
      address_neighbour,
      address_city,
      address_state,
      residencial_phone,
      cellphone,
      nr_apartament,
    } = req.body;

    return res.json(nome);
  }
}

export default new CadastroController();
