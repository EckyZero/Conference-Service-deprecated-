local APP_NAME=$1
local CONFIG_FILE=$2

# Check if it already exists
set +e
O=`gcloud deployment-manager deployments describe ${APP_NAME} 2>&1`  
exists=$?
set -e

if [ ${exists} -eq 0 ]; then
    echo ${APP_NAME} exists
    gcloud deployment-manager deployments update ${APP_NAME} --config=${CONFIG_FILE}
else
# Run Deployment Manager
gcloud deployment-manager --project=${PROJECT} deployments create ${NAME} --config=${CONFIG_FILE}
fi