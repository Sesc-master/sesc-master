export const scheduleTypes = ["group", "auditory", "teacher"] as const;
export type ScheduleType = typeof scheduleTypes[number];