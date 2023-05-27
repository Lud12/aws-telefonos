import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import commonMiddleware from "../../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const actualizarTelefono = async (event, context) => {
  try {
    const telefono = event.body;

    // Verificar si el id está presente en la solicitud
    if (!telefono.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falta el campo 'id' en la solicitud." }),
      };
    }

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    await dynamo.send(
      new PutCommand({
        TableName: "TelefonosTable",
        Item: telefono,
      })
    );

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "El elemento ha sido actualizado correctamente." }),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = commonMiddleware(actualizarTelefono);
