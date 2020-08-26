import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFoundComponent } from './items-found.component';

describe('ItemsFoundComponent', () => {
  let component: ItemsFoundComponent;
  let fixture: ComponentFixture<ItemsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
