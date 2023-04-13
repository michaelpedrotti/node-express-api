const GithubService = require("../services/githubService");
const AbstractController = require("./abstractController");

class GithubUserController {

    static async index(req, res){

        let json = {"error": false};

        try {

            json["rows"] = await GithubService.newInstance().listUsers(req.query);
        }
        catch(e){

            json["error"] = true;
            json["message"] = e.message;
        }

        res.json(json);
    }

    static async detail(req, res){

        res.json({"ok": true});
    }

    static async repos(req, res){

        res.json({"ok": true});
    }
}

module.exports = GithubUserController;