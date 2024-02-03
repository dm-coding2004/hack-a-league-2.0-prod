/*! JointJS+ v3.7.3 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2024-02-02 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatbotComponent } from 'src/app/chatbot/chatbot.component';
import { JsonEditorComponent } from 'src/app/json-editor/json-editor.component';
import { InspectorComponent } from 'src/app/inspector/inspector.component';
import { MessageInspectorComponent } from 'src/app/inspector/message-inspector/message-inspector.component';
import { LabelInspectorComponent } from 'src/app/inspector/label-inspector/label-inspector.component';
import { LinkInspectorComponent } from 'src/app/inspector/link-inspector/link-inspector.component';
import { BatchDirective } from 'src/directives/batch.directive';
import { EventBusService } from 'src/services/event-bus.service';


describe('ChatbotComponent', () => {
    let component: ChatbotComponent;
    let fixture: ComponentFixture<ChatbotComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            teardown: {
                destroyAfterEach: true
            },
            declarations: [
                ChatbotComponent,
                JsonEditorComponent,
                InspectorComponent,
                MessageInspectorComponent,
                LabelInspectorComponent,
                LinkInspectorComponent,
                BatchDirective
            ],
            providers: [
                EventBusService
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule
            ],
        }).compileComponents()

            .then(() => {
                fixture = TestBed.createComponent(ChatbotComponent);
                component = fixture.componentInstance;
            });
    }));

    beforeEach(() => {
        fixture.detectChanges();
    });

    it('should create chatbot component', () => {
        expect(component).toBeTruthy();
    });

    it('should render container and add rappid-scope class', () => {
        const RAPPID_SCOPE_CLASS_NAME = 'rappid-scope';
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.className).toBe(RAPPID_SCOPE_CLASS_NAME);
    });
});
