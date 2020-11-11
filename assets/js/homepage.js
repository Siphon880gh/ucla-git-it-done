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
// To Review: Fetch API error handling has response.ok to test if success, and has response.statusText
// To Review: Fetch API error handling informs of
var getUserRepos = function(username) {
    // console.log("username", username);
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert("Error: " + response.statusText)
        }).then(json => {
            if (json) {
                var arrRepos = json.map(repos => {
                    const { name, open_issues_count } = repos;
                    const username = repos.owner.login;
                    return { name, open_issues_count, username };
                });
                // console.log("Repositories simplified:");
                // console.dir(arrRepos);
                displayRepos(arrRepos, username);
            }
        }).catch(error => {
            alert("Error: Unable to connect to Github. Reason: " + error);
        });
}

/**
 * 
 * @function displayRepos Display repos information to the user interface
 * @param {array<string>} repos 
 * @param {string} searchTerm 
 */
var displayRepos = function(repos, searchTerm) {
    /* Relevant ID's:
        repo-search-term
        repos-container
    */

    var repoContainerEl = document.querySelector("#repos-container");
    var repoSearchTerm = document.querySelector("#repo-search-term");

    if (repos.length == 0) {
        repoContainerEl.textContent = "No repositories found";
    }

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos

    for (var i = 0; i < repos.length; i++) {

        // format repo name

        var repoName = repos[i].username + "/" + repos[i].name;


        // create a container for each repo

        var repoEl = document.createElement("div");

        repoEl.classList = "list-item flex-row justify-space-between align-center";


        // create a span element to hold repository name

        var titleEl = document.createElement("span");

        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element

        var statusEl = document.createElement("span");

        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container

        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);

    } // for


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