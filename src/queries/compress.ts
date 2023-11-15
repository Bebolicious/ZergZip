import { getFileApi } from '../api/fileApi';
import { ApiInvoke } from '../api/apiFactory';

export async function compress(apiInvoke: ApiInvoke): Promise<boolean> {
    let fileApi = getFileApi();
    return await fileApi.compress(apiInvoke.endpoint, apiInvoke.extraArguments);
}
