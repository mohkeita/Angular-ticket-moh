import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizersComponent } from './edit-organizers.component';

describe('EditOrganizersComponent', () => {
  let component: EditOrganizersComponent;
  let fixture: ComponentFixture<EditOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrganizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
