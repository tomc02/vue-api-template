#!/bin/bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Check if --build flag is provided
if [[ "$1" == "--build" ]]; then
  # Build and push Docker image
  echo "Building Docker image..."
  cp .env env-build
  gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/vue-app .
  rm env-build
else
  echo "Skipping Docker build (use --build to trigger build)."
fi

# Deploy to Google Cloud Run with all environment variables
echo "Deploying to Google Cloud Run..."
gcloud run deploy vue-app \
  --image gcr.io/$GOOGLE_PROJECT_ID/vue-app \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated
