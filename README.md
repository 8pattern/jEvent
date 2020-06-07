## Installation

```node
npm install @8pattern/jevent
```


## Usage

There are three methods to use jEvent:

### Bind a object 
> Suitable when you want to isolate events of different targets

```javascript
import jEvent from '@8pattern/jevent'

const tareget = document.body
const handle = () => {}

// suscribe
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

### As a variable
> If you want a global event channel, try it

```javascript
import jEvent from '@8pattern/jevent'

const handle = () => {}
jEvent.on('eventName', handle)
jEvent.emit('eventName')
jEvent.off('eventName', handle)
jEvent.clear('eventName')
```

In fact, if *no object*  binding, jEvent will binding a default **global object**. In other words, the usage is the sugar of the following statements.

```javascript
import jEvent from '@8pattern/jevent'

const handle = () => {}
jEvent().on('eventName', handle)
jEvent().emit('eventName')
jEvent().off('eventName', handle)
jEvent().clear('eventName')
```

### As a class

> Be aware that the imported module is a named one

```javascript
import { JEvent } from '@8pattern/jevent'

const jEvent = new JEvent()

const handle = () => {}
jEvent.on('eventName', handle)
jEvent.emit('eventName')
jEvent.off('eventName', handle)
jEvent.clear('eventName')
```

> The method is **effective** if you want achieve a event bus on a class
```javascript
import { JEvent } from '@8pattern/jevent'

class MyClass extends JEvent {
    // some codes
}

const myInstance = new MyClass()

const handle = () => {}
myInstance.on('eventName', handle)
myInstance.emit('eventName')
myInstance.off('eventName', handle)
myInstance.clear('eventName')
```
