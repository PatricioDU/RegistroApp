import { TestBed } from '@angular/core/testing';

import { NombreDelServicioService } from './nombre-del-servicio.service';

describe('NombreDelServicioService', () => {
  let service: NombreDelServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreDelServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
