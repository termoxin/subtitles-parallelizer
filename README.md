# subtitles-parallelizer (WIP)

A javascript library to easily work with subtitles (.srt). It helps to parse and easily process subtitles!

- [Installation](#installation)
- [Example](#example)
- [API](#api)

## Installation

`npm install parallelizer`
or
`yarn add parallelizer`

## Example

Imagine, we downloaded subtitles with name `movie.srt`. For instance, to parse a movie trascript to work with this in the further future.

The API of `subtitles-parallelizer` or simply `parallelizer` is pretty simple. Without further ado, let's get to the point and take a look at an example.

    1
    00:00:01,000 --> 00:00:05,000
    Subtitle 1.1
    Subtitle 1.2

    2
    00:00:30,500 --> 01:30:00,000
    Subtitle 2.1
    Subtitle 2.2
    Happy end 2.3

1. Load file or get subtitles from third-party services and put them into a variable

```js
import { promises as fs } from "fs";
import * as parallelizer from "parallelizer";

const run = async () => {
  const fileContent = await fs.readFile("movie.srt", "utf8");
  const sections = parallelizer.parse(text);

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
<dt><a href="#parse">parse</a></dt>
<dd><p>The function takes subtitles in srt format and returns sections as array of objects</p>
</dd>
<dt><a href="#parseBoth">parseBoth</a> </dt>
<dd><p>The function takes settings and return two parallelized subtitles
(for instance, to parallelize two different subtitles in different languages)</p>
</dd>
<dt><a href="#parseByName">parseByName</a> </dt>
<dd><p>The function takes name and text to find a word or a phrase in each section&#39;s content of the subtitles</p>
</dd>
<dt><a href="#parseByTimestamp">parseByTimestamp</a> </dt>
<dd><p>The function takes text, start and end time to get sections between specific timestamps</p>
</dd>
<dt><a href="#srtTimeToSeconds">srtTimeToSeconds</a></dt>
<dd><p>The function takes time in srt format (such as 00:01:00,200) and returns seconds</p>
</dd>
<dt><a href="#secondsToSrtTime">secondsToSrtTime</a></dt>
<dd><p>The function is the opposite of the srtTimeToSeconds function
it takes time in seconds and return a string in srt time format</p>
</dd>
</dl>

<a name="parse"></a>

## parse

The function takes subtitles text in srt format and returns sections as an array of objects

| Param | Description                                       |
| ----- | ------------------------------------------------- |
| text  | Subtitles text to parse into an array of objects. |

**Example**

```js
 const subtitles = `
    1
    00:00:01,000 --> 00:00:05,000
    Subtitle 1.1
    Subtitle 1.2
    `
 parse(subtitles)

 // output
 [
    {
      id: 1,
      startTime: '00:00:01',
      endTime: '00:00:05',
      startTimeWithMs: '00:00:01,000',
      endTimeWithMs: '00:00:05,000',
      content: 'Subtitle 1.1\nSubtitle 1.2'
    },
  ]
```

<a name="parseBoth"></a>

## parseBoth

The function takes settings and returns two parallelized subtitles
(for instance, to parallelize two different subtitles in different languages)

**Returns**: the tuple (array with two items), where items are the data structures of the same output
as the `parse` function returns

| Param                    | Description                            |
| ------------------------ | -------------------------------------- |
| settings                 | Settings to parallelize two subtitles. |
| settings.start           | The start time in each subtitles file. |
| settings.end             | The end time in each subtitles file.   |
| settings.firstSubtitles  | The first subtitles text.              |
| settings.secondSubtitles | The second subtitles text.             |

<a name="parseByName"></a>

## parseByName

The function takes name and subtitles text to find a word or a phrase in each section's content of the subtitles

**Returns**: the same array of objects as like `parse` function does

| Param | Description               |
| ----- | ------------------------- |
| name  | A word or phrase to find. |
| text  | The text to parse.        |

<a name="parseByTimestamp"></a>

## parseByTimestamp

The function takes subtitle text, start and end time to get sections between specific timestamps

**Returns**: the same array of objects like `parse` function does

| Param | Description                 |
| ----- | --------------------------- |
| text  | The subtitle text to parse. |
| start | The start timestamp.        |
| end   | The end timestamp.          |

<a name="srtTimeToSeconds"></a>

## srtTimeToSeconds

The function takes time in srt format (such as 00:01:00,200) and returns seconds

| Param | Description                     |
| ----- | ------------------------------- |
| time  | Srt time to convert in seconds. |

**Example**

```js
srtTimeToSecond("00:01:30,000"); // 90
```

<a name="secondsToSrtTime"></a>

## secondsToSrtTime

The function is the opposite of the srtTimeToSeconds function
it takes time in seconds and returns a string in srt time format

| Param   | Description                           |
| ------- | ------------------------------------- |
| seconds | Convert seconds into srt time format. |

**Example**

```js
secondsToSrtTime(90); // "00:01:30,000"
```
