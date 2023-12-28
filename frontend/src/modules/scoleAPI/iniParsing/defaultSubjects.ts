import {Subjects} from "../types/Subjects";

const DEFAULT_SUBJECTS_DEFINITION_REGEXP = /subjDef\s*=\s*\{((\s*[^:]+:\s*"[^"]+"\s*,\s*)*\s*[^:]+:\s*"[^"]+"\s*)}/m
const DEFAULT_SUBJECT_MAPPING_REGEXP = /\s*([^:,]+)\s*:\s*"([^"]+)"/gm

export function parseDefaultSubjects(script: string): Subjects {
    let mappings = script.match(DEFAULT_SUBJECTS_DEFINITION_REGEXP)?.[1] || "";
    return new Map(Array.from(mappings.matchAll(DEFAULT_SUBJECT_MAPPING_REGEXP))
        .map(value=> [value[1], value[2]]));
}