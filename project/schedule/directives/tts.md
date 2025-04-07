---
layout: doc
title: tts
tags: [schedule, tts, tool]
---
# tts
text-to-speech: Convert a piece of text to speech

## parameter
`text`: Text to be converted to speech, if this directive follows another instruction, Convert the result of the previous directive run. You can also use the placeholder `$1` to concatenate with the previous command to convert text to speech

## the directive result
```json
{
  "data": null
}
```
