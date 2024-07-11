import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDBClient();
const tableName = 'book-haven';

export const handler = async (event) => {
  let statusCode = 200;
  let body = '';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const {
      authorImageUrl,
      bookCoverUrl,
      author,
      title,
      price,
      category,
      rating,
      description,
    } = JSON.parse(event.body);

    if (
      !authorImageUrl ||
      !bookCoverUrl ||
      !author ||
      !title ||
      !price ||
      !category ||
      !rating ||
      !description
    ) {
      throw new Error('Invalid payload: Missing required fields');
    }

    const id = new Date().getTime().toString().padStart(13, '0');

    const putItemParams = {
      TableName: tableName,
      Item: {
        id: { S: id },
        date: { S: new Date().toISOString() },
        authorImageUrl: { S: authorImageUrl },
        author: { S: author },
        title: { S: title },
        price: { N: String(price) },
        category: { S: category },
        rating: { N: String(rating) },
        description: { S: description },
        bookCoverUrl: { S: bookCoverUrl },
      },
    };
    const putItemCommand = new PutItemCommand(putItemParams);
    await dynamoDBClient.send(putItemCommand);

    body = { message: 'Book created successfully' };
  } catch (error) {
    console.error('Error:', error);
    statusCode = 400;
    body = { message: 'Failed to create book', error: error.message };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
