# Circleci

## Environment Variables

### COVERALLS_REPO_TOKEN

- Configuration for coveralls

### GCLOUD_SERVICE_KEY_BASE64

- Using for google oauth
- Create a service account -> download the JSON-formatted key file
- cat <gcloud-credentials.json> | base64

### API_TOKEN_GITHUB

- Using for automatically pushing source code to `llead-frontend` repository
- Generate a new personal token in this [link](https://github.com/settings/tokens/new)
