const axios = require('axios');

class GithubService {

    /**
     * @link https://github.com/settings/tokens?type=beta
     */
    token = "";

    baseUrl = "https://api.github.com";

    constructor(){

        this.token = process.env.GITHUB_TOKEN || "";
    }

    async doRequest(method = 'GET', path = '/users'){

        const res =  await axios({
            method: method,
            url: this.baseUrl + path,
            headers: { 
              'Authorization': 'Bearer ' + this.token
            }
        });

        return res.data;
    }

    /**
     * 
     * @link https://docs.github.com/pt/rest/users/users?apiVersion=2022-11-28#list-users 
     */
    async listUsers(params = {}){

        let path = '/users';
        let query = new URLSearchParams(params).toString();

        if(query){
            path += '?' + query;
        }

        return await this.doRequest('GET', path);
    }

    /**
     *
     * @link https://docs.github.com/pt/rest/users/users?apiVersion=2022-11-28#get-a-user 
     */
    async getUser(username = "", params = {}){

        let path = '/users/' + username;
        let query = new URLSearchParams(params).toString();

        if(query){
            path += '?' + query;
        }

        return await this.doRequest('GET', path);
    }

    /**
     * 
     * @link https://docs.github.com/pt/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user 
     */
    async listReposUser(username = "", params = {}){

        let path = '/users/' + username + '/repos';
        let query = new URLSearchParams(params).toString();

        if(query){
            path += '?' + query;
        }

        return await this.doRequest('GET', path);
    }

    static newInstance(){

        return new GithubService();
    }
}

module.exports = GithubService