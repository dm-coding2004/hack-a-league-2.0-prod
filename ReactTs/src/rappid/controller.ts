/*! JointJS+ v3.7.3 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2024-02-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { mvc } from '@clientio/rappid';
import RappidService from 'src/services/rappid.service';

export enum SharedEvents {
    JSON_EDITOR_CHANGED = 'json-editor-changed',
    SELECTION_CHANGED = 'selection-changed',
    GRAPH_CHANGED = 'graph-changed',
    GRAPH_START_BATCH = 'graph-start-batch',
    GRAPH_STOP_BATCH = 'graph-stop-batch',
}

export abstract class Controller extends mvc.Listener<[RappidService]> {

    constructor(public readonly service: RappidService) {
        super(service);
        this.startListening();
    }

    abstract startListening(): void;
}
