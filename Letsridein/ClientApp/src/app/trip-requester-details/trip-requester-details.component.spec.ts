/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TripRequesterDetailsComponent } from './trip-requester-details.component';

let component: TripRequesterDetailsComponent;
let fixture: ComponentFixture<TripRequesterDetailsComponent>;

describe('trip-requester-details component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TripRequesterDetailsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TripRequesterDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});