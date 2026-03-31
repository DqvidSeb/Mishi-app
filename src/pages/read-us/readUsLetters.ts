export type ReadUsLetter = {
    id: string;
    author: string;
    content: string;
};

type RawLetterModules = Record<string, string>;

const rawLetters = import.meta.glob("../../content/read-us/*.letter.txt", {
    eager: true,
    query: "?raw",
    import: "default",
}) as RawLetterModules;

function fileNameFromPath(filePath: string) {
    return filePath.split("/").pop() ?? filePath;
}

function idFromPath(filePath: string) {
    return fileNameFromPath(filePath).replace(/\.letter\.txt$/i, "");
}

function titleFromFileName(filePath: string) {
    return idFromPath(filePath)
        .replace(/[-_]+/g, " ")
        .trim();
}

function parseLetter(filePath: string, rawContent: string): ReadUsLetter | null {
    const normalized = rawContent.replace(/\r\n/g, "\n").trim();
    if (!normalized) return null;

    const [firstLine, ...restLines] = normalized.split("\n");
    const authorMatch = firstLine.match(/^author\s*:\s*(.+)$/i);

    const author = (authorMatch?.[1] ?? titleFromFileName(filePath)).trim();
    const content = (authorMatch ? restLines.join("\n") : [firstLine, ...restLines].join("\n")).trim();

    if (!author || !content) return null;

    return {
        id: idFromPath(filePath),
        author,
        content,
    };
}

export const readUsLetters = Object.entries(rawLetters)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([filePath, rawContent]) => parseLetter(filePath, rawContent))
    .filter((letter): letter is ReadUsLetter => letter !== null);
