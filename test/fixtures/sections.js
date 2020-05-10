export const subtitlesWithNewLine = `
1
00:00:01,000 --> 00:00:05,000
Subtitle 1.1
Subtitle 1.2

2
00:00:30,500 --> 01:30:00,000
Subtitle 2.1
Subtitle 2.2
Happy end 2.3
`;

export const subtitlesWithCarriage = `
1
00:00:01,000 --> 00:00:05,000
Subtitle 1.1
Subtitle 1.2\r\n
2
00:00:30,500 --> 01:30:00,000
Subtitle 2.1
Subtitle 2.2
Happy end 2.3
`;

export const sectionsFromSubtitles = [
  {
    id: 1,
    startTime: "00:00:01",
    endTime: "00:00:05",
    startTimeWithMs: "00:00:01,000",
    endTimeWithMs: "00:00:05,000",
    content: "Subtitle 1.1\nSubtitle 1.2",
  },
  {
    id: 2,
    startTime: "00:00:30",
    endTime: "01:30:00",
    startTimeWithMs: "00:00:30,500",
    endTimeWithMs: "01:30:00,000",
    content: "Subtitle 2.1\nSubtitle 2.2\nHappy end 2.3",
  },
];
