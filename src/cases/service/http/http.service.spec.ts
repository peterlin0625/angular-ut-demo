import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {HttpService} from './http.service';

const simulationRequest = {
  userName: 'hello-1',
  id: '123456'
};

const successRespond = {
  status: 200,
  data: [
    {
      name: 'hello-1',
      id: '123456',
      time: '2020-01-01'
    },
    {
      name: 'hello-1',
      id: '123456',
      time: '2020-02-02'
    },
  ]
};

const failRespond = {
  status: 400,
  statusText: 'Bad Request'
};

describe('HttpService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`'simulationPostCall' function testing`, () => {
    it('#simulationPostCall should return success respond', () => {
      service.simulationPostCall(simulationRequest).subscribe(respond => {
        expect(respond.status).toBe(200);
        expect(respond.data.length).toBe(2);
        expect(respond.data[0].id).toBe('123456');
        expect(respond).toEqual(successRespond);
      });

      const apiRequest = httpTestingController.expectOne('http://localhost:4000/posts');
      expect(apiRequest.request.method).toBe('POST');
      apiRequest.flush(successRespond);
    });

    it('#simulationPostCall should return error respond', () => {
      service.simulationPostCall(simulationRequest).subscribe(respond => {
        expect(respond.status).not.toBe(200);
        expect(respond.statusText).toBe('Bad Request');
        expect(respond).toEqual(failRespond);
      });

      const apiRequest = httpTestingController.expectOne('http://localhost:4000/posts');
      expect(apiRequest.request.method).toBe('POST');
      apiRequest.flush(failRespond);
    });
  });
});
