import AWS from 'aws-sdk';

// Define the configuration for the DigitalOcean Spaces client
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com'); // Change to your space region
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: "key", //process.env.DO_SPACE_ACCESS_KEY, // Set your Access Key in environment variables
    secretAccessKey: "key", //process.env.DO_SPACE_SECRET_KEY, // Set your Secret Key in environment variables
});

// Define the name of your space and the file you want to fetch
const spaceName = 'jovenlucianoweb';
const fileName = 'images/paintings/paintings.json';

export const getFileFromSpace = async () => {
    try {
        const params = {
            Bucket: spaceName,
            Key: fileName,
        };

        const data = await s3.getObject(params).promise();
        const fileContent = data.Body?.toString('utf-8');

        if (fileContent) {
            console.log('File content:', fileContent);
            return fileContent;
        } else {
            console.log('File content is empty.');
        }
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
};

export const get_FetchFile = async (url: string) => {
    try {
        const response = await fetch(url);
        // Check if the request was successful
        if (!response.ok) {
            return undefined;
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //return the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    return
};