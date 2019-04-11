import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { RatingComponent } from './rating.component';

let component: RatingComponent;
let fixture: ComponentFixture<RatingComponent>;

describe('rating component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RatingComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
