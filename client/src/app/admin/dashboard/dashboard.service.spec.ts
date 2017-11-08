import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
    let mockBackend:MockBackend;
    let contextService:DashboardService;
 beforeEach(() => {
   TestBed.configureTestingModule({
     providers: [DashboardService,
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
   contextService =getTestBed().get(DashboardService);
   mockBackend = TestBed.get(MockBackend);
 });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
});