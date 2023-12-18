export interface JournalTiming {
  originalDates: string [],
  name: string,
  start: Date,
  end: Date
}

export interface YearTimings {
  firstQuarter: JournalTiming,
  secondQuarter: JournalTiming,
  firstSemester: JournalTiming,
  thirdQuarter: JournalTiming,
  fourthQuarter: JournalTiming
  secondSemester: JournalTiming,
  year: JournalTiming
}
