var issueContainerEl = document.querySelector("#issues-container");

var displayWarningOver30Issues = (repo) => {
    var limitWarningEl = document.querySelector("#limit-warning");
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
}

var getRepoIssues = function(repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {

                // Check if api has paginated issues
                // To Review: fetch API getting headers (Githug adds a Link header if pagination exists)
                if (response.headers.get("Link")) {
                    console.log("repo has more than 30 issues");
                    displayWarningOver30Issues(repo);
                }

                return response.json();
            } else alert("Error: There was a problem with your request");

        }).then(jsonResponse => {
            /**
             * @object jsonResponse[i]
             * @property jsonResponse[i].title
             * @property jsonResponse[i].url
             * @property jsonResponse[i].repository_url
             * @property jsonResponse[i].html_url
             * 
             */
            const issues = jsonResponse;
            displayIssues(issues);

        });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issue.html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    } // for

};

// TO REVIEW: Getting query parameter ?key=val&key2=val2 in the URL
if (document.location.search.length) {
    let queryString = document.location.search;
    let paramApi = new URLSearchParams(queryString);
    let repoName = paramApi.get("repo");
    if (repoName) getRepoIssues(repoName);
}