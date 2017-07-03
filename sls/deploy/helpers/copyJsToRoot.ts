import * as DeployConfig from "./config";
const s3 = require("s3");

export default function copyJsToRoot(NEW_TAG: string) {
  return new Promise((resolve, reject) => {
    const s3Client = s3.createClient(DeployConfig.S3_CLIENT_OPTIONS);

    console.log('copySource', `${DeployConfig.AWS_S3_FOLDER_PREFIX}/${NEW_TAG}/bundle.js`);
    const params = {
      Bucket: DeployConfig.AWS_S3_BUCKET,
      CopySource: `${DeployConfig.AWS_S3_BUCKET}/${DeployConfig.AWS_S3_FOLDER_PREFIX}/${NEW_TAG}/bundle.js`,
      Key: "bundle.js",
      ACL: 'public-read'
    };

    s3Client.copyObject(params, (err: Error, res: any) => {
      if (err) {
        console.error('copy to root has failed!', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
