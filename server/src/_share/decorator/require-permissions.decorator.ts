import { SetMetadata } from '@nestjs/common';
import { RequirePermissions } from '../enum/require-permissions.enum';

export const REQUIRE_PERMISSIONS_KEY = 'RequirePermissions';
export const Roles = (...roles: RequirePermissions[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, roles);
