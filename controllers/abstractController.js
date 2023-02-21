class AbstractController {

    static async delete(req, res) { 

        res.send('Delete was not implemented');
    }

    static async update(req, res) { 

        res.send('Update was not implemented');
    }

    static async edit(req, res) { 

        res.send('Edit was not implemented');
    }

    static async create(req, res) { 
  
        res.send('Create was not implemented');
    }

    static async new(req, res) {

        res.send('New was not implemented');
    }

    static async show(req, res) { 

        res.send('Show was not implemented');
    }

    static async paginate(req, res) {

        res.send('Paginate was not implemented');
    }

    static async index(req, res) {

        res.send('Index was not implemented');
    };
}

module.exports = AbstractController;