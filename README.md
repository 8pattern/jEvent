## Installation

```node
npm install -D @8pattern/jevent
```



## Usage

1. import the module

```javascript
import jEvent from '@8pattern/jevent'
```

​		or

```javascript
const jEvent = require('@8pattern/jevent')
```

2. bind a certain object

```javascript
const tareget = document.body
const handle = () => {}

// suscribe
// the return value equals handle
jEvent(target).on('eventName', handle)
jEvent(target).on(['event1', 'event2'], handle)

// publish
jEvent(target).emit('eventName', ['arg1', 'arg2'])
jEvent(target).emit(['event1', 'event2'])

// off
// the return value indicates whether the handle was removed
jEvent(target).off('eventName', handle)

// clear
// the return value indicates whether the event was removed
jEvent(target).clear('eventName')
```

  

if *no object*  binding, jEvent will binding a **global object** by default. In other words, the following statements also work.

```javascript
const handle = jEvent().on('eventName', () => {})
jEvent().emit('eventName')
jEvent().off('eventName', handle)
jEvent().clear('eventName')
```

or 

```javascript
const handle = jEvent.on('eventName', () => {})
jEvent.emit('eventName')
jEvent.off('eventName', handle)
jEvent.clear('eventName')
```
