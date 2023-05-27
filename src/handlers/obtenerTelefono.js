import {DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import commonMiddleware from "../../lib/commonMiddleware";
import createError from "http-errors";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const obtenerTelefono = async (event, context) => {

    let telefono;
    const { id } = event.pathParameters;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const result = await dynamo.send(new GetCommand({
            TableName: "TelefonosTable",
            Key: { id }
        }));

        telefono = result.Item;
        
    } 
    catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    if(!telefono) {
        throw new createError.NotFound('Telefono con id: ${id} no encontrado.');
    }

    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(telefono),
    };
}

export const handler = commonMiddleware(obtenerTelefono);