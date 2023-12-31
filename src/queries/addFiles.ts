import { getFileApi } from '../api/fileApi';
import { ApiInvoke } from '../api/apiFactory';

export async function addFiles(apiInvoke: ApiInvoke): Promise<string[]> {
    let fileApi = getFileApi();
    return await fileApi.set_files(apiInvoke.endpoint, apiInvoke.extraArguments);
}
