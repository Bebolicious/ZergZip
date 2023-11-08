if (filesToRemove.includes(url)) {
tempFiles = filesToRemove.filter((f) => f !== url);
alert(tempFiles);
if (!tempFiles || tempFiles.length === 0) {
alert('finns inga filer');
setFilesToRemove([]);
clearSelections();
}
setFilesToRemove(tempFiles);
handleFiles(tempFiles);
} else {
tempFiles = filesToRemove;
tempFiles.push(url);
setFilesToRemove(tempFiles);
handleFiles(tempFiles);
}

        tempFiles = [];
