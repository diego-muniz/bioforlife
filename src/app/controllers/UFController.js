import Gs_uf from '../models/gs_uf';

class UFController {
  async index(req, res) {
    const ufs = await Gs_uf.findAll();
    return res.json(ufs);
  }
}

export default new UFController();
