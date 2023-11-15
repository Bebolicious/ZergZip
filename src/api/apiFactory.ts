import { InvokeArgs, invoke } from '@tauri-apps/api/tauri';

export type Api = {
    set_files: (endpoint: string, args: InvokeArgs) => Promise<string[]>;
    remove_files: (endpoint: string, args: InvokeArgs) => Promise<string[]>;
    clear_files: <T>(endpoint: string, args: InvokeArgs) => Promise<T>;
    compress: (endpoint: string, args: InvokeArgs) => Promise<boolean>;
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
        remove_files: async (endpoint: string, args: InvokeArgs): Promise<string[]> => {
            const files: string[] = await invoke(endpoint, {
                method: args.method,
                files: args.files
            });
            return files;
        },
        clear_files: async (endpoint: string, args: InvokeArgs): Promise<any> => {
            await invoke(endpoint, {
                method: args.method,
                files: args.files
            });
        },
        compress: async (endpoint: string, args: InvokeArgs): Promise<any> => {
            const success = await invoke(endpoint, {
                method: args.method,
                files: args.files,
                target: args.target
            });
            return success;
        }
    };
}
