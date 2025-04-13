import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import * as admin from 'firebase-admin';
  
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
  
      if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or malformed token');
      }
  
      const idToken = authHeader.split('Bearer ')[1];
  
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid Firebase ID token');
      }
    }
}
  