const jEvent = require('../src/jEvent').default

describe('the "Store" property of instance will store all targets', () => {
  test('the "Store" property is WeakMap', () => {
    expect(jEvent.Store).toBeInstanceOf(WeakMap)
  })

  test('when binding a new target, it will appear in "Store" property', () => {
    const target = {}
    const _ = jEvent(target)
    expect(jEvent.Store.has(target)).toBeTruthy()
  })

  test('if the target was destoried, it will not be stored in "Store" property', () => {
    let target = {}
    const jEventInstance = jEvent(target)
    expect(jEvent.Store.has(target)).toBeTruthy()
    
    target = {}
    expect(jEvent.Store.has(target)).toBeFalsy()
  })
})

describe('jEvent will return right instance', () => {
  test('if biding a defined object, return the previous one instance', () => {
    const target = {}
    const _1 = jEvent(target)
    const instance = jEvent.Store.get(target)
    expect(_1).toBe(instance)

    const _2 = jEvent(target)
    expect(_1).toBe(_2)
  })

  test('if biding a new object, return a new one instance', () => {
    const _1 = jEvent({})
    const _2 = jEvent({})
    expect(_1).not.toBe(_2)
  })

  test('if biding a jEvent instance, return self', () => {
    const target = {}
    expect(jEvent(jEvent(target))).toBe(jEvent(target))
  })
})

describe('subscribe function works', () => {
  test('when subscribe a event, Events propety will add it', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}
    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events).toHaveProperty(eventName)
  })

  test('when subscribe the same event more times, Events propety will only have one handle', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}
    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events[eventName]).toHaveLength(1)
    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events[eventName]).toHaveLength(1)

    jEvent(target).on(eventName, () => {})
    expect(jEvent(target).Events[eventName]).toHaveLength(2)
  })

  test('the subscribe will return the same handle of the second paramenter', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}
    expect(jEvent(target).on(eventName, handle)).toBe(handle)

    expect(jEvent(target).on(eventName, () => {})).not.toBe(handle)
  })

  test('the subscribe can receice an event list as the first parameter', () => {
    const target = {}
    const eventName = ['event1', 'event2']
    const handle = () => {}
    expect(jEvent(target).on(eventName, handle)).toBe(handle)
  })
})

describe('publish function works', () => {
  test('subscribe will be called with right arguments', () => {
    const target = {}
    const eventName = 'event'
    const param = [1, 2, 3]
    jEvent(target).on(eventName, (...args) => {
      expect(args).toEqual(param)
    })

    jEvent(target).emit(eventName, ...param)
  })

  test('all subscribes will be called', () => {
    const target = {}
    const eventName = 'event'
    jEvent(target).on(eventName, (args) => {
      expect(args).toBeUndefined()
    })
    jEvent(target).on(eventName, (args) => {
      expect(args).toBeUndefined()
    })
    jEvent(target).emit(eventName)
  })

  test('subscribes can receive an event list as the first parameter', () => {
    const target = {}
    const eventName = ['event1', 'event2']
    jEvent(target).on('event1', (args) => {
      expect(args).toBeNull()
    })
    jEvent(target).on('event2', (args) => {
      expect(args).toBeNull()
    })
    jEvent(target).emit(eventName, null)
  })
})

describe('remove function works', () => {
  test('subscribe can remove', () => {
    const target = {}
    const eventName = 'event'
    const handle = jest.fn(() => {})
    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events[eventName]).toContain(handle)
    
    jEvent(target).emit(eventName)
    expect(handle).toBeCalledTimes(1)

    jEvent(target).off(eventName, handle)
    expect(jEvent(target).Events[eventName]).not.toContain(handle)

    jEvent(target).emit(eventName)
    expect(handle).toBeCalledTimes(1)
  })

  test('if handle removed, return true', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}
    jEvent(target).on(eventName, handle)
    expect(jEvent(target).off(eventName, handle)).toBeTruthy()
  })

  test('if handle was not existed, return false', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}
    expect(jEvent(target).Events[eventName]).not.toEqual(expect.arrayContaining([handle]))
    expect(jEvent(target).off(eventName, handle)).toBeFalsy()
  })

  test('if event was not defined, return false', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}

    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events).toHaveProperty(eventName)

    const otherEventName = 'otherEvent'
    expect(jEvent(target).Events).not.toHaveProperty(otherEventName)
    expect(jEvent(target).off(otherEventName, handle)).toBeFalsy()
  })
})

describe('clear function works', () => {
  test('if event exists, it will be removed and return true', () => {
    const target = {}
    const eventName = 'event'
    const handle = () => {}

    jEvent(target).on(eventName, handle)
    expect(jEvent(target).Events).toHaveProperty(eventName)

    expect(jEvent(target).clear(eventName)).toBeTruthy()
    expect(jEvent(target).Events).not.toHaveProperty(eventName)
  })

  test('if event did not exist, return false', () => {
    const target = {}
    const eventName = 'event'
    expect(jEvent(target).Events).not.toHaveProperty(eventName)
    expect(jEvent(target).clear(eventName)).toBeFalsy()
  })
})

describe('default props of function', () => {
  const jEventDefaultInstance = jEvent()

  test('Store prop defined only in function, not in instance', () => {
    expect(jEvent.Store).toBeDefined()
    expect(jEventDefaultInstance.Store).not.toBeDefined()
    expect(jEvent({}).Store).not.toBeDefined()
  })

  test('props in default instance will be found in function', () => {
    for (let prop in jEventDefaultInstance) {
      expect(jEvent[prop]).toBe(jEventDefaultInstance[prop])
    }
  })
})
