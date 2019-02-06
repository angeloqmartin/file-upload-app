const env = require('.appAccessKeys')

// installed npm aws-sdk, importing packages
// fs package will be used to write file data in app
const fs = require("fs");

// use env var, to set up AWS access and secret access key
// should not be pushed to any version control sw
const AWS = require("aws-sdk");
const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const fileName = './sysData/filename.csv';

const uploadFile = () => {

    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'testBucket', // pass bucket name
            Key: 'filename.csv', // file will be saved as testBucket/filename.csv
            Body: JSON.stringify(data, null, 2)
        };

        // uploads file,using Key and BucketName
        s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
        });
    });
};

uploadFile();

module.exports = env;