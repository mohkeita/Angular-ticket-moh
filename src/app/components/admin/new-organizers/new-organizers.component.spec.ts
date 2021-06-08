import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrganizersComponent } from './new-organizers.component';

describe('NewOrganizersComponent', () => {
  let component: NewOrganizersComponent;
  let fixture: ComponentFixture<NewOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrganizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
