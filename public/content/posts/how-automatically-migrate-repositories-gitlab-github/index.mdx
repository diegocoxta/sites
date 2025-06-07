---
title: How to automatically migrate all your repositories from Gitlab to Github.
date: 2023-02-11T09:12:03.284Z
summary: After postponing for a long time I decided to migrate all my repositories from Gitlab to Github. How easy should this task be?
language: English
tags:
  - gitlab
  - github
  - vcs
  - terminal
  - til
  - english
---

Since GitHub announced that teams and users would be able to use unlimited private repositories I've been thinking about migrating my old projects archived on Gitlab and centralizing all my projects on Github. After postponing for a long time I decided to do this migration this Saturday night. _(is it the best use of my free time? maybe)_

The first issue I faced is the migration tool provided by GitHub only imports one repository at a time and it always asks for my GitLab password to complete the migration. I had 100 or more repositories, it would take a long time to complete.

So, thinking about how to make the most of my night, I decided to dive deep into GitLab and GitHub's public APIs, run this migration in 5 minutes, and now, explain how you can do that too.

**Migrating all your repositories from Gitlab to Github.**

The first step is to download all your Gitlab projects to your local machine and to do this, you need your GitLab User ID (you can find this number under your name in your profile) and a [private GitLab token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) with `api` and `read_repository` scopes.

Now you have the information needed to run the following command in your terminal instance replacing your user-id and private-token:

```sh
USER_ID=""
PRIVATE_TOKEN=""

for repo in $(curl -s https://gitlab.com/api/v4/users/$USER_ID/projects\?private_token\=$PRIVATE_TOKEN\&per_page\=999 | jq -r ".[].ssh_url_to_repo"); do
  git clone $repo;
done
```

This command will clone all projects from your account to your local machine. I recommend running it inside a dedicated folder as it will be important in the next steps. I previously created a "gitlab" folder.

The last step is to create the repositories on GitHub and upload all the content downloaded in the previous step. Let's go.

To do this, you will use the official [GitHub CLI](https://cli.github.com/). After downloading and logging in using `gh auth login`, you can use `gh repo create` to complete the job.

```sh
for project in */; do
  if [ -d "$project" ]; then
    cd $project;
    gh repo create ${project:0:-1} --source=. --private --push --remote=upstream;
    cd ..;
  fi
done
```

This command will map all folders (Now you know why it was important to create a dedicated folder to clone all projects), navigate through them, use `gh repo create` to create a remote repository with the same folder name (you can remove the flag `--private` to create public repositories) and push all content to the remote.

Job done! **And we can now delete all Gitlab projects programmatically (optional).**

_TIP: For delete repositories your Private Token needs `write_repository` scope_

```sh
USER_ID=""
PRIVATE_TOKEN=""

for repo in $(curl -s https://gitlab.com/api/v4/users/$USER_ID/projects\?private_token\=$PRIVATE_TOKEN\&per_page\=999 | jq -r ".[].id"); do
  curl -X DELETE https://gitlab.com/api/v4/projects/$repo\?private_token\=$PRIVATE_TOKEN;
done
```

This command will send a delete request for every project that you have.

So, do you know a simpler way to do this job? Send me a tip on [Twitter](https://twitter.com/diegocoxta), I'd love to know.

_This article was also published in [Dev Community](https://dev.to/diegocoxta/how-to-automatically-migrate-all-your-repositories-from-gitlab-to-github-40mn) and [Medium](https://medium.com/@diegocoxta/how-to-automatically-migrate-all-your-repositories-from-gitlab-to-github-5665bab2e44)_
