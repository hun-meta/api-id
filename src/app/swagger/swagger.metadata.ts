// swagger.metadata.ts
import { createBody, createSwaggerOptions } from '../../common/decorator/swagger.decorator';
import { SUCCESS_RES } from '../constants/response-info.constants';

export const GET_DEFAULT_RES_OPTS = createSwaggerOptions({
    summary: 'return datetime, for testing server(Default Path)',
    responses: [
        {
            status: 200,
            description: 'request success',
            schema: {
                example: createBody(SUCCESS_RES, {
                    responseStr: 'Welcome to API - Auth\n<DateTime>',
                }),
            },
        },
    ],
});

export const GET_HEALTH_OPTS = createSwaggerOptions({
    summary: 'AWS Health Check Path',
    responses: [
        {
            status: 200,
            description: 'request success',
            schema: {
                example: createBody(SUCCESS_RES, { responseStr: '<DateTime>' }),
            },
        },
    ],
});
