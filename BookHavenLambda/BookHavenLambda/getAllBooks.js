import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamoDBClient = new DynamoDBClient();
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async () => {
  let statusCode = 200;
  let items = [];
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const scanCommand = new ScanCommand({
      TableName: 'book-haven',
    });

    const response = await dynamoDBDocumentClient.send(scanCommand);

    items = response.Items;
  } catch (error) {
    statusCode = 400;
    items = [{ error: error.message }];
  }

  return {
    statusCode,
    body: items,
    headers,
  };
};
