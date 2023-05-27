import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import commonMiddleware  from "../../lib/commonMiddleware"; 
import createError from "http-errors";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const listarTelefonos = async (event, context) => {
    try {
        let telefonos;

        const result = await dynamo.send(new ScanCommand({
            TableName: "TelefonosTable",
        }));

        telefonos = result.Items;

        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        };

        return{ 
            statusCode: 201,
            headers: headers,
            body: JSON.stringify(telefonos),
        };
        
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = commonMiddleware(listarTelefonos);
