import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientModule, MdbModalModule, CommonModule, BrowserModule , MDBBootstrapModule, FormsModule, ReactiveFormsModule, MdbFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
    it('should open modal on add customer', () => {
        debugElement.query(By.css('button.btn'))
          .triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.modalRef).toBeTruthy();
    });
});
