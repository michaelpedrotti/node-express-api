const axios = require('axios');

class GithubService {

    /**
     * @link https://github.com/settings/tokens?type=beta
     */
    token = "";

    baseUrl = "https://api.github.com";

    constructor(){

        this.token = process.env.GITHUB_TOKEN || "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";
    }

    async doRequest(method = 'GET', path = '/users'){

        const res =  await axios({
            method: method,
            url: this.baseUrl + path,
            headers: { 
              'Authorization': 'Bearer ' + this.token
            }
        });

        return res;
    }

    /**
     * 
     * @link https://docs.github.com/pt/rest/users/users?apiVersion=2022-11-28#list-users 
     */
    async listUsers(params = {}){

        if(!params['per_page']){
            params['per_page'] = 5;
        }

        let path = '/users';
        let query = new URLSearchParams(params).toString();

        if(query){
            path += '?' + query;
        }

        const res =  await this.doRequest('GET', path);
        let pages = {};

        // https://docs.github.com/pt/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
        const regex = /\<([^\>]+)\>\; rel=\"([\w+]+)\"/g;
        let match;

        while (match = regex.exec(res.headers["link"])){

            pages[match[2]] = match[1].replace(this.baseUrl + '/users', "");
            // console.log('Match: ' + match[0] + ' - ' + match[1] + ' = ' + match[2]);
        }

        return {pages: pages, rows: res.data};
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

        const res =  await this.doRequest('GET', path);
        return res.data;
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

        const res =  await this.doRequest('GET', path);
        return res.data;
    }

    static newInstance(){

        return new GithubService();
    }
}

module.exports = GithubService