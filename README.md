# subtitles-parallelizer (WIP)

A javascript library to easily work with subtitles (.srt), parse them, process do all of the kind of stuff with them

- [Installation](#installation)
- [Example](#example)
- [API](#api)

## Installation:

`npm install parallelizer`
or
`yarn add parallelizer`

## Example

Imagine, we downloaded a subtitles with name `movie.srt`. For instance, to parse a movie trascript to work with that in the further future.

The API of `subtitles-parallelizer` or simply `parallelizer` is pretty simple. Without further ado, let's get to the point and take a look at example.

    1
    00:00:01,000 --> 00:00:05,000
    Subtitle 1.1
    Subtitle 1.2

    2
    00:00:30,500 --> 01:30:00,000
    Subtitle 2.1
    Subtitle 2.2
    Happy end 2.3

1. Load file or get subtitles from third party services and get thos into a variable

```js
import { promises as fs } from "fs";
import * as parallelizer from "parallelizer";

const run = async () => {
  const fileCOntent = await fs.readFile("movie.srt", "utf8");
  const sections = parallelizer.splitOnSections(text)("\n");

  console.log(sections);
};

run();
```

There we go, this is how our sections data array looks like

    [
      {
        id: 1,
        startTime: '00:00:01',
        endTime: '00:00:05',
        startTimeWithMs: '00:00:01,000',
        endTimeWithMs: '00:00:05,000',
        content: 'Subtitle 1.1\n    Subtitle 1.2'
      },
      {
        id: 2,
        startTime: '00:00:30',
        endTime: '01:30:00',
        startTimeWithMs: '00:00:30,500',
        endTimeWithMs: '01:30:00,000',
        content: 'Subtitle 2.1\n    Subtitle 2.2\n    Happy end 2.3'
      }
    ]

## API

<dl>
<dt><a href="#srtTimeToSeconds">srtTimeToSeconds</a></dt>
<dd><p>The function takes time in srt format (such as 00:01:00,200) and returns seconds</p>
</dd>
<dt><a href="#secondsToSrtTime">secondsToSrtTime</a></dt>
<dd><p>The function is the opposite of the srtTimeToSeconds function
it takes time in seconds and return a string in srt time format</p>
</dd>
</dl>

## srtTimeToSeconds

The function takes time in srt format (such as 00:01:00,200) and returns seconds

| Param | Description                    |
| ----- | ------------------------------ |
| time  | srt time to convert in seconds |

**Example**

```js
srtTimeToSecond("00:01:30,000"); // 90
```

## secondsToSrtTime

The function is the opposite of the srtTimeToSeconds. The function takes time in seconds and return a string in srt time format

| Param   | Description                          |
| ------- | ------------------------------------ |
| seconds | convert seconds into srt time format |

**Example**

```js
secondsToSrtTime(90); // "00:01:30,000"
```
