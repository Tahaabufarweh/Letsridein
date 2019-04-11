import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NewTripComponent } from './new-trip.component';

let component: NewTripComponent;
let fixture: ComponentFixture<NewTripComponent>;

describe('new-trip component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NewTripComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(NewTripComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
