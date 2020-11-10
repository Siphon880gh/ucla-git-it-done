/**
 * 
 * @function getUserRepos Get Github user's repositories. An array of objects representing repositories.
 * @param {string} username 
 * @object {PromiseObject} Obj
 * @property Obj.name property (for the repository name),
 * @property Obj.open_issues_count property (for the number of issues)
 * @property Obj.owner.login property is the repos owner
 * 
 */
// To Review: Fetch API is not intuitive, but fetching returns a promise, as does response.json(), and you call .then() on promises to use a callback. Most likely why they return promises is the convention of chaining that jQuery AJAX follows.
var getUserRepos = function(username) {
    // console.log("username", username);
    fetch(`https://api.github.com/users/${username}/repos`).then(response=>{
        response.json().then(json=>{
            var arr = json.map(repos=>{
                const {name, open_issues_count} = repos;
                const username = repos.owner.login;
                return {name, open_issues_count, username};
            });
            console.log("Repositories simplified:");
            console.dir(arr);
        })
    })
};

/**
 * 
 * @function displayRepos Display repos information to the user interface
 * @param {array<string>} repos 
 * @param {string} searchTerm 
 */
var displayRepos = function(repos, searchTerm) {

}
  
/**
 * @function initSearchForm User interface to search Github user
 * 
 */
function initSearchForm() {
    var userFormEl = document.querySelector("#user-form");
    var nameInputEl = document.querySelector("#username");

    var formSubmitHandler = function(event) {
        event.preventDefault();
        
        // get value from input element
        var username = nameInputEl.value.trim();
        console.log("username input" + username)
        if (username) {

            getUserRepos(username);

            nameInputEl.value = "";

        } else {

            alert("Please enter a GitHub username");

        }
    };
    userFormEl.addEventListener("submit", formSubmitHandler);
}

initSearchForm();