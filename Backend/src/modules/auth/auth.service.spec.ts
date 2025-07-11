import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../../utils/bcrypt';

class AdminsServiceMock {
  async getAdminWithoutResponses(userName: string) {
    const mockAdmin = { userName: 'testuser', password: 'hashed_password', role: 'admin' };
    return mockAdmin;
  }
}

class JwtServiceMock {
  async signAsync(payload: any) {
    const mockAccessToken = 'mock_secret_access_token';
    return mockAccessToken;
  }
}

jest.mock('../../utils/bcrypt.ts', () => ({
  comparePasswords: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let adminsService: AdminsService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AdminsService, useClass: AdminsServiceMock },
        { provide: JwtService, useClass: JwtServiceMock },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    adminsService = moduleRef.get<AdminsService>(AdminsService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should throw UnauthorizedException when invalid password is provided', async () => {
      
      (comparePasswords as jest.Mock).mockReturnValue(false);

      await expect(authService.login('testuser', 'invalid_password')).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token and admin data when valid credentials are provided', async () => {
      
      (comparePasswords as jest.Mock).mockReturnValue(true);

      const result = await authService.login('testuser', 'valid_password');
      expect(result).toEqual({ accessToken: 'mock_secret_access_token', admin: { userName: 'testuser', role: 'admin' } });
    });
  });
});
