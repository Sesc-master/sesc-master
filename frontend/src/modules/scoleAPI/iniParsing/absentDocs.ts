const ABSENT_DOCS_NAMES_DEFINITION_REGEXP = /sprVid\s*=\s*\{((\s*[^:\s]+\s*:\s*"[^"]+"\s*,)*\s*[^:\s]+\s*:\s*"[^"]+"\s*)\}/m
const ABSENT_DOC_NAME_DEFINITION_REGEXP = /([^:\s,]+)\s*:\s*"([^"]+)"/gm

export function parseAbsentDocsNames(script: string): Map<string, string> {
    let rolesNamesDefinition = script.match(ABSENT_DOCS_NAMES_DEFINITION_REGEXP)?.[1] || "";
    return new Map(Array.from(rolesNamesDefinition.matchAll(ABSENT_DOC_NAME_DEFINITION_REGEXP))
        .map(value=> [value[1], value[2]]));
}