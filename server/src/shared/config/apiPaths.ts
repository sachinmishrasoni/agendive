import environment from "./environment";

const API_PATHS: { [key: string]: string } = {
    AUTH: environment.API_BASE_PATH + '/auth',
    USERS: environment.API_BASE_PATH + '/users',
    TODOS: environment.API_BASE_PATH + '/todos',
    TASKS: environment.API_BASE_PATH + '/tasks',
};

export default API_PATHS;