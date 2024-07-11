import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamoDBClient = new DynamoDBClient();
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);
const tableName = 'book-haven';

export const handler = async (event) => {
  let statusCode = 200;
  let body = '';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const bookId = event.pathParameters?.bookId;

    if (!bookId) {
      throw new Error('Book ID is missing in path parameters');
    }

    const params = {
      TableName: tableName,
      Key: {
        id: bookId,
      },
    };

    const command = new GetCommand(params);
    const { Item } = await dynamoDBDocumentClient.send(command);

    if (!Item) {
      throw new Error(`Book with ID ${bookId} not found`);
    }

    body = { book: Item };
  } catch (error) {
    console.error('Error:', error);
    statusCode = 400;
    body = { message: 'Failed to get book details', error: error.message };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
