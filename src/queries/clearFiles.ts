import { getFileApi } from '../api/fileApi';
import { ApiInvoke } from '../api/apiFactory';

export async function clearFiles(apiInvoke: ApiInvoke): Promise<string[]> {
    let fileApi = getFileApi();
    return await fileApi.clear_files<string[]>(apiInvoke.endpoint, apiInvoke.extraArguments);
}
