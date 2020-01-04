// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import Gs_uf from '../models/gs_uf';
import Gs_municipio from '../models/gs_municipio';

class BuscarCepController {
  async show(req, res) {
    const { cep } = req.params;

    if (!cep) {
      res.status(404).json({ error: 'Informe o CEP !' });
    }

    if (cep.length !== 8) {
      res.status(404).json({ error: 'Informe o CEP corretamente !' });
    }

    const viaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (viaCep.data.erro) {
      res.status(404).json({ error: 'Informe o CEP corretamente !' });
    }

    const { ibge } = viaCep.data;

    const cidade = await Gs_municipio.findOne({
      where: { CD_MUNICIPIO_COMPLETO: ibge },
      attributes: ['CD_IBGE_UF', 'CD_MUNICIPIO_COMPLETO'],
    });

    return res.json({ endereco: viaCep.data, cidade });
  }
}

export default new BuscarCepController();
