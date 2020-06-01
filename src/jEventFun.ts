import JEvent from './jEvent'

export default function jEvent(target: object = JEvent.Store) {
    return new JEvent(target)
}

const defaultInstance = new JEvent()
jEvent.on = defaultInstance.on
jEvent.emit = defaultInstance.emit
jEvent.off = defaultInstance.off
jEvent.clear = defaultInstance.clear
