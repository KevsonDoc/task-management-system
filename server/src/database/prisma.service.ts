import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PermissionsEntity } from 'src/_share/entities/permissions.entity';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    await this.permissions.createMany({
      skipDuplicates: true,
      data: [
        new PermissionsEntity({
          id: '086a97b2-0d62-408e-af7a-12b25e13839f',
          name: 'READ',
        }),
        new PermissionsEntity({
          id: '9edfa289-f1e5-4555-8b9a-13758881d54b',
          name: 'READ_ALL',
        }),
        new PermissionsEntity({
          id: '39ca0d10-dde2-4cca-bbb8-2acdc8ef6ae7',
          name: 'CREATE',
        }),
        new PermissionsEntity({
          id: 'bba50321-8d9e-49ea-b2b9-176ac2eca5d4',
          name: 'UPDATE',
        }),
        new PermissionsEntity({
          id: '4a701b68-9e82-4c5c-bc0e-cacf19a9b8aa',
          name: 'DELETE',
        }),
      ],
    });
  }
}
