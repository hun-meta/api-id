import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
} from 'src/common/exception/constants/http.response-info.constants';
import { createBody, createSwaggerOptions } from '../../common/decorator/swagger.decorator';
import { ID_CREATED } from '../constants/response-info.constants';

export const generateIdOpts = createSwaggerOptions({
    summary: 'generate snowflake ID for database table',
    bearerAuth: true,
    params: [
        {
            name: 'table',
            required: true,
            description: 'Name of the table for which to generate the ID',
            schema: {
                type: 'string',
            },
            example: 'users',
        },
    ],
    responses: [
        {
            status: 201,
            description: 'ID generated',
            schema: { example: createBody(ID_CREATED, { table: 'table name', id: 'snowflake id' }) },
        },
        {
            status: 400,
            description: 'Bad Request',
            schema: {
                example: createBody(BAD_REQUEST, {
                    message:
                        'not empty || is string',
                }),
            },
        },
        {
            status: 401,
            description: 'UnAuthorized',
            schema: {
                example: createBody(UNAUTHORIZED, {
                    message: 'Invalid API key || Authorization header is missing',
                }),
            },
        },
        {
            status: 500,
            description: 'Internal Server Error',
            schema: {
                example: createBody(INTERNAL_SERVER_ERROR, {
                    message: 'Internal server error',
                }),
            },
        },
    ],
});
