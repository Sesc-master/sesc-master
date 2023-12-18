import {JournalTiming} from "./YearTimings";

export interface AvgMark {
    mark: number | '-',
    timing: JournalTiming
}

export interface AvgMarks {
  firstQuarter: AvgMark,
  secondQuarter: AvgMark,
  firstSemester: AvgMark,
  thirdQuarter: AvgMark,
  fourthQuarter: AvgMark
  secondSemester: AvgMark,
  year: AvgMark
}