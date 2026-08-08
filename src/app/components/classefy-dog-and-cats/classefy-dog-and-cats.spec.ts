import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassefyDogAndCats } from './classefy-dog-and-cats';

describe('ClassefyDogAndCats', () => {
  let component: ClassefyDogAndCats;
  let fixture: ComponentFixture<ClassefyDogAndCats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassefyDogAndCats],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassefyDogAndCats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
