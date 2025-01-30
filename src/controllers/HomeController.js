class HomeController {
    async index(req, res) {
        
        res.status(200).json('Home index');
    }
}

export default new HomeController;