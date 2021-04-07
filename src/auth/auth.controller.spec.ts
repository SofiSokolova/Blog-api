import { MailService } from '../core/mailer.service';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const usersService: UsersService = {
    create() {}
  } as any;
  const tokenService = {
    createJwtToken(): Promise<string> {
      return Promise.resolve('tokenStr');
    },
    setToken(): Promise<string> {
      return Promise.resolve('tokenStr');
    },
  } as any;
  const mailService: MailService = {
    sendMail() {},
  } as any;

  beforeEach(() => {
    authService = new AuthService(usersService, tokenService, mailService);
    authController = new AuthController(authService);
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const createSpy = jest.spyOn(authService, 'createUser');
      const user = {
        email: 'kours.d2@gmail.com',
        password: 'sosiskasUka1',
        passwordConfirm: 'sosiskasUka1',
      };
      await authController.create(user);
      expect(createSpy).toHaveBeenCalled();
    });
  });
});
