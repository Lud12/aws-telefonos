import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import commonMiddleware from "../../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const eliminarTelefono = async (event, context) => {
  const { id } = event.pathParameters;

  try {
    // Verificar si el id está presente en la solicitud
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falta el parámetro 'id' en la URL." }),
      };
    }

    // Eliminar el elemento de DynamoDB
    await dynamo.send(
      new DeleteCommand({
        TableName: "TelefonosTable",
        Key: { id },
      })
    );

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "El elemento ha sido eliminado correctamente." }),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(eliminarTelefono);
