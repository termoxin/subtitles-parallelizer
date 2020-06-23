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

export const subtitlesForOffset = `
1
00:00:01,000 --> 00:00:05,000
She saw no irony asking me to change  but wanting me to accept her for who she is.
Subtitle 1.2\r\n
2
00:00:30,500 --> 00:35:00,000
Each person who knows you has a
different perception of who you are
Subtitle 1.2\r\n
3
00:36:00,000 --> 00:40:05,000
She had some amazing news to share but nobody to share it with.
Subtitle 1.2\r\n
4
00:00:45,500 --> 00:50:00,000
Subtitle 2.1
Subtitle 2.2
Happy end 2.3\r\n
5
01:00:01,000 --> 01:00:05,000
Subtitle 1.1
Subtitle 1.2\r\n
6
01:05:30,500 --> 01:30:00,000
Subtitle 2.1
Subtitle 2.2
Happy end 2.3\r\n
`;
