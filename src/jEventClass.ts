import JEvent from './jEvent'

export default class {
    private $jevent = new JEvent(this)
    on = this.$jevent.on
    emit = this.$jevent.emit
    off = this.$jevent.off
    clear = this.$jevent.clear
}