/**
 * 
 * @function getUserRepos Get Github user's repositories
 * @param {string} username 
 */
// To Review: Fetch API is not intuitive, but fetching returns a promise, as does response.json(), and you call .then() on promises to use a callback. Most likely why they return promises is the convention of chaining that jQuery AJAX follows.
var getUserRepos = function(username) {
    // console.log("username", username);
    fetch(`https://api.github.com/users/${username}/repos`).then(response=>{
        response.json().then(json=>{
            console.log(json);
        })
    })
};
  
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