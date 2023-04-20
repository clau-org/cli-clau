import { walk } from "https://deno.land/std@0.184.0/fs/mod.ts";

export type replaceByOptions = {
  textToReplace: string;
  search: string;
  replacement: string;
};

export function replaceInText(
  { textToReplace, search, replacement }: replaceByOptions,
): string {
  const searchRegex = new RegExp(`${search}`, "gi");
  return textToReplace.replace(searchRegex, (matched: string) => {
    return matched.charAt(0) === matched.charAt(0).toUpperCase()
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });
}

export type replaceInFilesContentOptions = {
  dir: string;
  search: string;
  replacement: string;
};
export async function replaceInFilesContent({
  dir,
  search,
  replacement,
}: replaceInFilesContentOptions): Promise<void> {
  for await (const entry of walk(dir, { includeDirs: true })) {
    if (entry.isFile) {
      try {
        const fileContent = await Deno.readTextFile(entry.path);
        const replacedContent = replaceInText({
          textToReplace: fileContent,
          search,
          replacement,
        });
        await Deno.writeTextFile(entry.path, replacedContent);
      } catch (error) {
        console.error(`Error processing file ${entry.path}:`, error);
      }
    }
  }
}

export type replaceInFilesNamesOptions = {
  dir: string;
  search: string;
  replacement: string;
};
export async function replaceInFilesNames({
  dir,
  search,
  replacement,
}: replaceInFilesNamesOptions): Promise<void> {
  const entries = [];

  // First, collect all the entries to avoid renaming conflicts while traversing.
  for await (const entry of walk(dir, { includeDirs: true })) {
    entries.push(entry);
  }

  // Process and rename collected entries.
  for (const entry of entries) {
    const searchRegex = new RegExp(`${search}`, "gi");

    const newPath = entry.path.replace(searchRegex, (matched: string) => {
      return matched.charAt(0) === matched.charAt(0).toUpperCase()
        ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
        : replacement;
    });

    if (entry.path !== newPath) {
      try {
        await Deno.rename(entry.path, newPath);
      } catch (_e) {}
    }
  }
}

export type replaceInFilesOptions = {
  dir: string;
  search: string;
  replacement: string;
};
export async function replaceInFiles(options: replaceInFilesOptions) {
  await replaceInFilesContent(options);
  await replaceInFilesNames(options);
}
