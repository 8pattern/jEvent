const Store: WeakMap<object, JEvent> = new WeakMap()

export interface Events {
  [key: string]: Array<Function>
}

class JEvent {
  public readonly Events: Events = {}
  public readonly on: Function = this._subscribe
  public readonly emit: Function = this._publish
  public readonly off: Function = this._remove
  public readonly clear: Function = this._clear

  constructor(target: object = Store) {
    if (target instanceof JEvent) {
      return target
    }
    if (Store.has(target)) {
      return Store.get(target) as JEvent
    }
    Store.set(target, this)
  }

  private _subscribe(event: string | string[], handle: Function): Function {
    ((typeof event === 'string') ? [event] : event)
      .forEach((evt) => {
        if (!this.Events[evt]) {
          this.Events[evt] = []
        }
        if (!this.Events[evt].some(item => item === handle)) {
          this.Events[evt].push(handle)
        }
      })
    return handle
  }

  private _publish(event: string | string[], ...args: any[]): void {
    ((typeof event === 'string') ? [event] : event)
      .forEach((evt) => {
        const handleList = this.Events[evt]
        if (handleList) {
          handleList.forEach((handle) => {
            handle(...args)
          })
        } 
      })
  }

  private _remove(event: string, handle: Function): boolean {
    const handleList = this.Events[event]
    if (handleList) {
      const handleIndex = handleList.findIndex(item => item === handle)
      if (handleIndex >= 0) {
        handleList.splice(handleIndex, 1)
        return true
      }
    }
    return false
  }

  private _clear(event: string): boolean {
    if (!(event in this.Events)) {
      return false
    } 
    return Reflect.deleteProperty(this.Events, event)
  }
}

export default function jEvent(target: object = Store) {
  return new JEvent(target)
}

(function() {
  const defaultInstance = new JEvent()
  for (let prop in defaultInstance) {
    jEvent[prop] = defaultInstance[prop]
  }
  jEvent['Store'] = Store
})()
