// src/auth/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Verificar se o email do usuário é o email admin definido na configuração
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    
    if (user.email !== adminEmail) {
      throw new ForbiddenException('Acesso restrito ao administrador');
    }
    
    return true;
  }
}