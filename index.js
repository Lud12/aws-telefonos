export const handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("hello lambda"),
  };
  return response;
};