const { validationResult } = require('express-validator');

class AbstractController {

    /**
     * @returns {import('express-validator').ResultFactory} 
     */
    static validate(req){

        return validationResult(req);
    }

    static async delete(req, res) { 

        res.json({ error: false, message: 'Delete was not implemented'});
    }

    static async update(req, res) { 

        res.json({ error: false, message: 'Update was not implemented'});
    }

    static async edit(req, res) { 

        res.json({ error: false, message: 'Edit was not implemented'});
    }

    static async create(req, res) { 
  
        res.json({ error: false, message: 'Create was not implemented'});
    }

    static async new(req, res) {

        res.json({ error: false, message: 'New was not implemented'});
    }

    static async show(req, res) { 

        res.json({ error: false, message: 'Show was not implemented'});
    }

    static async index(req, res) {

        res.json({ error: false, message: 'Index was not implemented'});
    };
}

module.exports = AbstractController;