import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDBClient();
const tableName = 'Payments';

export const handler = async (event) => {
  let statusCode = 200;
  let body = '';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const { userEmail, amount } = JSON.parse(event.body);

    if (!userEmail || !amount || isNaN(amount)) {
      throw new Error(
        'Invalid input: userEmail and amount are required and amount must be a number'
      );
    }
    const id = new Date().getTime().toString().padStart(13, '0');

    const params = {
      TableName: tableName,
      Item: {
        id: { S: id },
        userEmail: { S: userEmail },
        amount: { N: amount.toString() },
        paymentDate: { S: new Date().toISOString() },
      },
    };

    const command = new PutItemCommand(params);

    await dynamoDBClient.send(command);

    body = { message: 'Payment recorded successfully' };
  } catch (error) {
    console.error('Error recording payment:', error);
    statusCode = 400;
    body = { message: 'Failed to record payment', error: error.message };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
