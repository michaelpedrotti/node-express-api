const GithubService = require("../services/githubService");
const AbstractController = require("./abstractController");

class GithubUserController {

    static async index(req, res){

        let json = {"error": false};

        try {

            const result = await GithubService.newInstance().listUsers(req.query);
            console.log(res);

            json["rows"] = result.rows;
            json["pages"] = result.pages;
            json['count'] = result.rows.length;
        }
        catch(e){

            json["error"] = true;
            json["message"] = e.message;
            json["trace"] = e.trace;
        }

        res.json(json);
    }

    static async detail(req, res){

        
        let json = {"error": false};

        try {

            json["data"] = await GithubService.newInstance().getUser(req.params.username, req.query);
        }
        catch(e){

            json["error"] = true;
            json["message"] = e.message;
        }

        res.json(json);
    }

    static async repos(req, res){

        
        let json = {"error": false};

        try {

            json["data"] = await GithubService.newInstance().listReposUser(req.params.username, req.query);
        }
        catch(e){

            json["error"] = true;
            json["message"] = e.message;
        }

        res.json(json);
    }
}

module.exports = GithubUserController;