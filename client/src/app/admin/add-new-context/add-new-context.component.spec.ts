// import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import {Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { FormsModule } from '@angular/forms';
// import { HttpModule, Http , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod } from '@angular/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import {  MockBackend, MockConnection } from '@angular/http/testing'
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { AddNewContextComponent } from './add-new-context.component';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
// import swal from 'sweetalert2';
// class RouterStub {
//   navigateByUrl(url: string) { return url; }
// }
// describe('Add new context', () => {
//   let component: AddNewContextComponent;
//   let fixture: ComponentFixture<AddNewContextComponent>;
//   let service : any;
//   let data:any;
//   let router = {
//     navigate: jasmine.createSpy('navigate')
//   }
//   //let data= {questions:[{question:"what is chutiya?"}]}
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports : [
//       ModalModule.forRoot(),TabsModule.forRoot(),
//       FormsModule, HttpModule, RouterTestingModule
//       ],
//       declarations: [ AddNewContextComponent],
//       providers : [
//       { provide: Router, useValue: router },
//       MockBackend,
//       BaseRequestOptions,
//       {
//         provide: Http,
//         deps: [MockBackend, BaseRequestOptions],
//         useFactory:
//         (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         }
//       }
//       ],      
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();
//     fixture = TestBed.createComponent(AddNewContextComponent);
//     component = fixture.componentInstance;
//   }));
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   //================test for getunanswer===================///
 
  


//   });