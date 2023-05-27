import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import {v4 as uuid} from "uuid";
import commonMiddleware  from "../../lib/commonMiddleware"; 
import createError from "http-errors";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const crearTelefono = async (event, context) => {
    try {
        const telefono = event.body;
        
        const newTelefono = {
            ...telefono,
            id: uuid(),
            FechaIng: new Date().toLocaleDateString(),
        };

        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        };

        await dynamo.send(new PutCommand({
            TableName: "TelefonosTable",
            Item: newTelefono,
        })); 

        return{ statusCode: 201,
          headers: headers,
            body: JSON.stringify(newTelefono)
        };
        
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = commonMiddleware(crearTelefono);
