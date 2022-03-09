#!/bin/sh
git config --global user.name "$USER_NAME"
git config --global user.email $USER_EMAIL

git config --unset-all http.https://github.com/.extraheader

git remote add dest "https://$API_TOKEN_GITHUB@github.com/$DESTINATION_REPOSITORY_USERNAME/$DESTINATION_REPOSITORY_NAME.git"


echo "Filter branch"
git filter-branch -f --env-filter "
GIT_AUTHOR_NAME='$USER_NAME'
GIT_AUTHOR_EMAIL='$USER_EMAIL'
GIT_COMMITTER_NAME='$USER_NAME'
GIT_COMMITTER_EMAIL='$USER_EMAIL'
" HEAD

echo "Pushing git commit"
git push -f dest $CIRCLE_BRANCH:$CIRCLE_BRANCH
