class TermosController {
  async show(req, res) {
    return res.json({
      termo: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Vestibulum sapien quam, dictum ut ultricies nec, varius
    pellentesque odio. Suspendisse sit amet augue quis quam
    vehicula consectetur. Praesent pharetra mi lectus, facilisis
    rhoncus tellus pellentesque nec. Duis in neque vitae erat
    vulputate laoreet. Proin sodales mi a turpis consequat, id
    pellentesque mauris posuere. In lacinia risus a nisi`,
    });
  }
}

export default new TermosController();
