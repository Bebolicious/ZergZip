import { Api, createApi } from './apiFactory';

let mainApi: Api | null = null;

export function getFileApi() {
    if (mainApi === null) {
        mainApi = createApi();
    }

    return mainApi;
}
