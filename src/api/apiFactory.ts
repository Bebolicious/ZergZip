import { InvokeArgs, invoke } from '@tauri-apps/api/tauri';

export type Api = {
    set_files: <T>(endpoint: string, args: InvokeArgs) => Promise<string[]>;
    remove_files: <T>(endpoint: string, args: InvokeArgs) => Promise<T>;
    clear_files: <T>(endpoint: string, args: InvokeArgs) => Promise<T>;
};

export type ApiInvoke = {
    endpoint: string;
    extraArguments: InvokeArgs;
};

export function createApi(): Api {
    return {
        set_files: async (endpoint: string, args: InvokeArgs): Promise<string[]> => {
            const files: string[] = await invoke(endpoint, {
                method: args.method,
                files: args.files
            });
            return files;
        },
        remove_files: async (endpoint: string, args: InvokeArgs): Promise<any> => {},
        clear_files: async (endpoint: string, args: InvokeArgs): Promise<any> => {}
    };
}
