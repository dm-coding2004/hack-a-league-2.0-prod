/*! JointJS+ v3.7.3 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2024-02-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import {
    Events,
    Events_On,
    Events_Off,
    Events_Trigger,
    Events_Listen,
    Events_Stop,
} from 'backbone';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface SharedEvent {
    name: string;
    value: any;
}

export class EventBusService implements Events  {

    on: Events_On<EventBusService>;
    off: Events_Off<EventBusService>;
    trigger: Events_Trigger<EventBusService>;
    bind: Events_On<EventBusService>;
    unbind: Events_Off<EventBusService>;

    once: Events_On<EventBusService>;
    listenTo: Events_Listen<EventBusService>;
    listenToOnce: Events_Listen<EventBusService>;
    stopListening: Events_Stop<EventBusService>;

    constructor() {
        Object.assign(this, Events);
    }

    private _events = new Subject<SharedEvent>();

    events(): Observable<SharedEvent> {
        return this._events.asObservable();
    }

    emit(eventName: string, value?: any): void {
        this._events.next({ name: eventName, value: value });
    }

    subscribe(eventName: string, callback: any): Subscription {
        return this._events.pipe(
            filter(e => e.name === eventName),
            map(e => e.value)
        ).subscribe(callback);
    }
}
