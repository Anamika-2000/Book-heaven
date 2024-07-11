import { S3 } from 'aws-sdk';
const s3 = new S3();

export const handler = async (event) => {
  const { fileContent, fileName } = JSON.parse(event.body);
  const base64Data = Buffer.from(fileContent, 'base64');
  const BUCKET_NAME = 'public-book-haven';

  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: base64Data,
      ContentType: 'image/jpeg',
    };

    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'File uploaded successfully',
        location: data.Location,
      }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to upload file',
        error: error.message,
      }),
    };
  }
};
