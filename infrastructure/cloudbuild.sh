APP_NAME=$1
CONFIG_FILE=$2

# Check if it already exists
set +e
O=`gcloud deployment-manager deployments describe ${APP_NAME} 2>&1`  
exists=$?
set -e

if [ ${exists} -eq 0 ]; then
    echo ${APP_NAME} exists
    gcloud deployment-manager deployments update ${APP_NAME} --config=${CONFIG_FILE}
else
    # Increase build time since infrastructure may take awhile
    gcloud config set app/cloud_build_timeout 1800
    
    # Enable Cloud SQL
    gcloud services enable sqladmin.googleapis.com
    
    # Enable deployment manager
    gcloud services enable deploymentmanager.googleapis.com
    
    # Run Deployment Manager
    gcloud deployment-manager deployments create ${APP_NAME} --config=${CONFIG_FILE}
fi