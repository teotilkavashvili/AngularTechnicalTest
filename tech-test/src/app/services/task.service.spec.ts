/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as exp from 'constants';

describe('Service: Task', () => {
  let service: TaskService;
  let HttpClientSpy:jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let fixture:ComponentFixture<TaskService>
  let TASKS=[
    {
      "id": 1,
      "label": "Kitchen Cleanup",
      "description": "Clean my dirty kitchen",
      "category": "house",
      "done": false
    },
    {
      "id": 2,
      "label": "Taxes 123",
      "description": "Start doing my taxes and contact my accountant jhon for advice",
      "category": "bureaucracy",
      "done": "22-10-2019"
    }
  ]

  const uncompletedTask: Task = {
    id: '1',
    label: 'Kitchen Cleanup',
    description: 'Clean my dirty kitchen',
    category: 'House',
    done: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
  });

  it('should ...', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        service,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    service = TestBed.inject(TaskService);
    HttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

    describe('getTasks()',()=>{
      it('should returs expected Tasks when call the service',()=>{
        HttpClientSpy.get.and.returnValue(of(TASKS));
        service.getTasks().subscribe({
          next:(tasks:any)=>{
            expect(tasks).toEqual(TASKS);
          },
          error:()=>{},
        });
        expect(HttpClientSpy.get).toHaveBeenCalledTimes(1);
      });
    })
  

  describe('Create Task', () => {
    it('should create Task', () => {
      const resolve: Task = uncompletedTask;
      const url = `${environment.baseUrl}/Task, ${resolve}`;
      service.createTask(resolve).subscribe(task=>{
        expect(task).toEqual(uncompletedTask)
      });

    });

    const req = httpMock.expectOne(`${environment.baseUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(uncompletedTask);
  });

  describe('Delete Task', () => {
    it('should delete Task', () => {
      service.deleteTask(1).subscribe(result=>{
        expect(result).toBeTruthy()
      });
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

  describe('edit Task', () => {
    it('should edit Task', () => {
      service.editTask(uncompletedTask).subscribe(result=>{
        expect(result).toEqual(uncompletedTask)
      });
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(uncompletedTask);
  });


})
