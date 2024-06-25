import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRoutesGuard } from './auth-routes.guard';

describe('authRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
