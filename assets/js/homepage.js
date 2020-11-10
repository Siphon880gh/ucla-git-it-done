// To Review: Fetch API is not intuitive, but fetching returns a promise, as does response.json(), and you call .then() on promises to use a callback. Most likely why they return promises is the convention of chaining that jQuery AJAX follows.
var getUserRepos = function(username) {
    // console.log("username", username);
    fetch(`https://api.github.com/users/${username}/repos`).then(response=>{
        response.json().then(json=>{
            console.log(json);
        })
    })
};
  
// getUserRepos();