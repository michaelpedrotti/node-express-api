
const { expect, test } = require ('@jest/globals');
const GithubService = require("../services/githubService");
  
const service = GithubService.newInstance();

test('list users', async() => {

    const result = await service.listUsers({'per_page': 3});
    
    console.log(result?.rows?.length);

    expect(result?.rows?.length).toBe(3);
});

test('user details', async() => {

    let username = "michaelpedrotti";
    const data = await service.getUser(username);

    expect(data?.login).toBe(username);
});

test('user repositories', async() => {

    let username = "michaelpedrotti";
    const [ row ] = await service.listReposUser(username);

    console.log(row?.owner?.login);

    expect(row?.owner?.login).toBe(username);
});
