import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalConstants } from '@constants/global.constants';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MockDependenciesModule } from 'app/modules/mock-dependecies/mock-dependencies.module';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ] ,
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        MdbModalModule,
        CommonModule,
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MdbFormsModule,
        MockDependenciesModule,
      ],
      providers: [ToastrService, MdbModalService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
