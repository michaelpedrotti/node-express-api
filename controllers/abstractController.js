class AbstractController {

    static async delete(req, res) { 

        res.send(_('Delete was not implemented'));
    }

    static async update(req, res) { 

        res.send(_('Update was not implemented'));
    }

    static async edit(req, res) { 

        res.send(_('Edit was not implemented'));
    }

    static async create(req, res) { 
  
        res.send(_('Create was not implemented'));
    }

    static async new(req, res) {

        res.send(_('New was not implemented'));
    }

    static async show(req, res) { 

        res.send(_('Show was not implemented'));
    }

    static async paginate(req, res) {

        res.send(_('Paginate was not implemented'));
    }

    static async index(req, res) {

        res.send(_('Index was not implemented'));
    };
}

module.exports = AbstractController;