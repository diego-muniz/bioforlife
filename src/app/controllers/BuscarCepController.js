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

    const { uf } = viaCep.data;

    const dadosUf = await Gs_uf.findOne({ where: { CD_UF: uf } });

    if (!dadosUf) {
      return res.status(404).json({ error: 'UF não encontrada !' });
    }

    const cidades = await Gs_municipio.findAll({
      where: { CD_IBGE_UF: dadosUf.CD_IBGE },
    });

    return res.json({ endereco: viaCep.data, cidades });
  }
}

export default new BuscarCepController();
