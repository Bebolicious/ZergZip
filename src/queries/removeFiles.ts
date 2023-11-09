import { getFileApi } from '../api/fileApi';
import { ApiInvoke } from '../api/apiFactory';

export async function removeFiles(apiInvoke: ApiInvoke): Promise<string[]> {
    let fileApi = getFileApi();
    return await fileApi.remove_files(apiInvoke.endpoint, apiInvoke.extraArguments);
}
