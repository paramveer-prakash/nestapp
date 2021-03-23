/*
* URL constants
*/
export const BASE_SCM_URL: string = "https://api.github.com";
export const REPO_URL: string = BASE_SCM_URL + "/users/{username}/repos";
export const BRANCHES_URL: string = BASE_SCM_URL + "/repos/{username}/{reponame}/branches";

/*
* Exception constants
*/

export const USER_NOT_FOUND: string = "User does not exist";