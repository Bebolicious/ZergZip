export const removeDuplicates = (prevFiles: string[], files: string[]) => {
    return files.filter((file) => !prevFiles.includes(file));
};
