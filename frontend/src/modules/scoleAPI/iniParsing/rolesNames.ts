const ROLES_NAMES_DEFINITION_REGEXP = /roleNames\s*=\s*\{((\s*[^:\s]+\s*:\s*"[^"]+"\s*,)*\s*[^:\s]+\s*:\s*"[^"]+"\s*)\}/m
const ROLE_NAME_DEFINITION_REGEXP = /([^:\s,]+)\s*:\s*"([^"]+)"/gm

export function parseRolesNames(script: string): Map<string, string> {
    let rolesNamesDefinition = script.match(ROLES_NAMES_DEFINITION_REGEXP)?.[1] || "";
    return new Map(Array.from(rolesNamesDefinition.matchAll(ROLE_NAME_DEFINITION_REGEXP))
        .map(value=> [value[1], value[2]]));
}