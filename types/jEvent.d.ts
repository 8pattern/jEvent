export as namespace jEvent;

export = jEvent;

export function jEvent(target: any): JEvent;

interface Events {
    [key: string]: Array<Function>
}

export class JEvent {
    constructor(target: object);
    
    readonly Events: Events;

    on(event: string | string[], handle: Function): Function;
    emit(event: string | string[], ...args: any[]): void;
    off(event: string, handle: Function): boolean;
    clear(event: string): boolean;
}

declare namespace jEvent {
    
}