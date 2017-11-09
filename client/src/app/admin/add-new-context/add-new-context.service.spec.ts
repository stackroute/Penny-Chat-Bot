import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import { AddNewContextService } from './add-new-context.service';
import {MockBackend, MockConnection } from '@angular/http/testing';

describe('Add new context Service', () => {
    let mockBackend:MockBackend;
    let intentService:AddNewContextService;
 beforeEach(() => {
   TestBed.configureTestingModule({
     providers: [AddNewContextService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }]
   }).compileComponents();
   intentService =getTestBed().get(AddNewContextService);
   mockBackend = TestBed.get(MockBackend);
 });

 it('should be created', inject([AddNewContextService], (service: AddNewContextService) => {
   expect(service).toBeTruthy();
 }));

});