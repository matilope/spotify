import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as mockRaw from '../../../data/user.json';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // prueba send credentials
  // chequear si la interfaz de la respuesta

  it('It should return an object with "data" and "tokenSession"', (done: DoneFn) => {

    // arrange
    const user: any = mockUser.userOk;
    const mockResponse = {
      data: {},
      tokenSession: '0x0x0x'
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    //act
    service.sendCredentials(user.email, user.password).subscribe({
      next:(response)=>{
        const getProperties = Object.keys(response);
        expect(getProperties).toContain('data');
        expect(getProperties).toContain('tokenSession');
        done();
      }
    })
  });
});
