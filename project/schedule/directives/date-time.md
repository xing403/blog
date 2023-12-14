---
layout: doc
title: date-time
---

# date-time
get current date and time

## parameter
`format`: format of the date and time, Non-required field, default: `YYYY-MM-DD HH:mm:ss`.

### more parameter

<DateTimeParameter />



## the directive run result
```json
{
  "data": "current date time"
}
```


<script setup>
import DateTimeParameter from '/examples/date-time-parameter.vue'
</script>
