#!/usr/bin/env bash

REPO_URL=us.gcr.io/$GOOGLE_PROJECT_ID/ipno-backend

TARGET_BRANCH=$(git rev-parse --abbrev-ref HEAD)
IMAGE_BRANCH=$TARGET_BRANCH
IMAGE_TAG=${TARGET_BRANCH/\//-}
FILE_BRANCH=$TARGET_BRANCH
while [ true ]
do
  existing_tags=$(gcloud container images list-tags --filter="tags:$IMAGE_TAG" --format=json $REPO_URL)

  if [ "$existing_tags" != "[]" ]; then
    break
  fi

  IMAGE_BRANCH=$(git log --pretty=format:'%D' $IMAGE_BRANCH^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@')
  IMAGE_TAG=${IMAGE_BRANCH/\//-}
done

while [ true ]
do
  file_path=gs://llead-integration-db/$FILE_BRANCH/*
  gsutil -q stat $file_path
  return_value=$?

  if [ $return_value == 0 ]; then
    break
  fi

  FILE_BRANCH=$(git log --pretty=format:'%D' "$FILE_BRANCH"^ | grep 'origin/' | head -n1 | sed 's@origin/@@' | sed 's@,.*@@')
done



gsutil cp -r "gs://llead-integration-db/$FILE_BRANCH/*" .

gcloud auth configure-docker --quiet


docker run -d --rm --name web-test -p "9000:9000" --network=ipno -e DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY --env-file ./test-backend.env us.gcr.io/$GOOGLE_PROJECT_ID/ipno-backend:$IMAGE_TAG python ipno/manage.py runserver 0.0.0.0:9000
