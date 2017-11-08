import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {  MockBackend, MockConnection } from '@angular/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextComponent } from './context.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ContextService } from './context.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
describe('ContextComponent', () => {
  let component: ContextComponent;
  let fixture: ComponentFixture<ContextComponent>;
   let service : any;
     let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
      ModalModule.forRoot(),TabsModule.forRoot(),
      FormsModule, HttpModule, RouterTestingModule
      ],
      declarations: [ ContextComponent],
      providers : [
      { provide : ContextService },
        { provide: Router, useValue: router },
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
      ],      
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ContextComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ContextService);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //=============positive testcase delete context ==================================
 it('delete context positive',()=>{
  let data={
    status:true
  }
  const spy =spyOn(service,'deleteContext').and.returnValue(Observable.of(data));
  component.deleteContext(data);
    console.log('zzz',component.ref.status);
  console.log('cc',data.status);
  //fixture.detectChanges();
  fixture.whenStable().then(()=>{
     console.log('zzz---1',component.ref.status);
  console.log('cc--1',data.status);
expect(component.ref.status).toEqual(data.status);
  })
  
})
//=============negative testcase delete context ==================================
it('delete context negative',()=>{
  let data={
    status:true
  }
  const spy =spyOn(service,'deleteContext').and.returnValue(Observable.of(data));
  component.deleteContext(data);
    console.log('zzz',component.ref.status);
  console.log('cc',data.status);
  //fixture.detectChanges();
  fixture.whenStable().then(()=>{
     console.log('zzz---1',component.ref.status);
  console.log('cc--1',data.status);
expect(component.ref.status).not.toEqual(null);
  })
  });
//=============positive testcase delete context ==================================
   it( "positive get context testcase", () => {
     let mockResponse:any ={
           identity: {
           low:0,
           high:1, 
           },   
           labels:[ "Domain"],
           properties: {
            name:"retirement plan"
           },
       }
    const spy = spyOn(service, 'getContext' ).and.returnValue(
      Observable.of(mockResponse)
      )
    //console.log('000000000000000000000000',component)
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.getContext();
    console.log('000000000000000000000000',component)
      expect(component).toEqual(mockResponse);
    })
  });
//=============negative testcase delete context ==================================
   it( "positive get context testcase", () => {
     let mockResponse:any ={
           identity: {
           low:0,
           high:1, 
           },   
           labels:[ "Domain"],
           properties: {
            name:"retirement plan"
           },
       }
    const spy = spyOn(service, 'getContext' ).and.returnValue(
      Observable.of(mockResponse)
      )
   
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.getContext();
    
      expect(component).not.toEqual(mockResponse);
    })
  });
   //=============positive testcase onItemSelectContext ============================
   it( "positive onItemSelectContext testcase", () => {
     let mockResponse={
       id: 3, 
       label: "Attriute", 
       itemName: "individual"
     }
    component.onItemSelectContext(mockResponse);
    console.log('akaur0', component.contextval);
     console.log('kaur000', mockResponse),
     //console.log('00000', component.item)
     
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.contextval).toEqual(mockResponse);
      expect(component.contextval.id).toEqual(mockResponse.id);
      expect(component.contextval.label).toEqual(mockResponse.label);
      expect(component.contextval.itemName).toEqual(mockResponse.itemName);
    })
  });
//=============negative testcase onItemSelectContext ============================
   it( "negative onItemSelectContext testcase", () => {
     let mockResponse={
       id: 3, 
       label: "Attriute", 
       itemName: "individual"
     }
    component.onItemSelectContext(mockResponse);
    console.log('akaur0', component.contextval);
     console.log('kaur000', mockResponse),
     //console.log('00000', component.item)
     
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.contextval).not.toEqual(null);
      expect(component.contextval.id).not.toEqual(undefined);
      expect(component.contextval.label).not.toEqual(undefined);
      expect(component.contextval.itemName).not.toEqual(undefined);
    })
  });
   //=============positivetestcase onItemSelect ===================================
   it( "positive onItemSelect testcase", () => {
     let mockResponse1={
       id: 1, 
       itemName: "type", 
       name: "type", priority: "2"
       }
    component.onItemSelect(mockResponse1);
    console.log('akaur0', component.selectedIntent);
     console.log('kaur000', mockResponse1),
     //console.log('00000', component.item)
     
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.selectedIntent[0]).toEqual(mockResponse1);
      expect(component.selectedIntent[0].id).toEqual(mockResponse1.id);
      expect(component.selectedIntent[0].itemName).toEqual(mockResponse1.itemName);
      expect(component.selectedIntent[0].name).toEqual(mockResponse1.name);
   
    })
  });
   //=============negative testcase onItemSelect ===================================
   it( "negative onItemSelect testcase", () => {
     let mockResponse1={
       id: 1, 
       itemName: "type", 
       name: "type", priority: "2"
       }
    component.onItemSelect(mockResponse1);
    console.log('akaur0', component.selectedIntent[0]);
     console.log('kaur000', mockResponse1),
     //console.log('00000', component.item)
     
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.selectedIntent[0]).not.toEqual(null);
      expect(component.selectedIntent[0].id).not.toEqual(null);
      expect(component.selectedIntent[0].itemName).not.toEqual(null);
      expect(component.selectedIntent[0].name).not.toEqual(null);
    })
  });
});