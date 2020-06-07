export interface Events {
  [key: string]: Array<Function>
}

export default class JEvent {
  private readonly Events: Events = {}
  public readonly on = this._subscribe
  public readonly emit = this._publish
  public readonly off = this._remove
  public readonly clear = this._clear

  static Store: WeakMap<object, JEvent> = new WeakMap()

  constructor(target: object = JEvent.Store) {
    if (target instanceof JEvent) {
      return target
    }
    if (JEvent.Store.has(target)) {
      return JEvent.Store.get(target) as JEvent
    }
    JEvent.Store.set(target, this)
  }

  private _subscribe(event: string | string[], handle: Function): void {
    ((typeof event === 'string') ? [event] : event)
      .forEach((evt) => {
        if (!this.Events[evt]) {
          this.Events[evt] = []
        }
        if (!this.Events[evt].some(item => item === handle)) {
          this.Events[evt].push(handle)
        }
      })
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
