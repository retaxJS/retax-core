jest.unmock('inversify');
jest.unmock('../InversifyKernelFacade');

import { interfaces, KernelModule } from 'inversify';
import { IUserModule } from '../interfaces';
import InversifyKernelFacade from '../InversifyKernelFacade';

describe('InversifyKernelFacade', () => {
  const module1Id = Symbol('module1');
  const module2Id = Symbol('module2');
  const module1 = new KernelModule((bind: interfaces.Bind) => bind(module1Id).toConstantValue(1));
  const module2 = new KernelModule((bind: interfaces.Bind) => bind(module2Id).toConstantValue(2));

  const baseModules: IUserModule[] = [
    {
      kernelModule: module1,
      serviceId: module1Id,
    },
    {
      kernelModule: module2,
      serviceId: module2Id,
    },
  ];

  it('loads modules into the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    kernelFacade.loadModules(baseModules);

    expect((<any>kernelFacade)._loadedUserModules.get(module1Id)).toEqual(true);
    expect((<any>kernelFacade)._loadedUserModules.get(module2Id)).toEqual(true);

    expect(kernelFacade.getService(module1Id)).toEqual(1);
    expect(kernelFacade.getService(module2Id)).toEqual(2);

    const module3Id = Symbol('module3');
    const module3 = new KernelModule((bind: interfaces.Bind) => bind(module3Id).toConstantValue(3));

    const userModules2: IUserModule[] = [
      {
        kernelModule: module3,
        serviceId: module3Id,
      },
    ];

    kernelFacade.loadModules(userModules2);

    expect((<any>kernelFacade)._loadedUserModules.get(module3Id)).toEqual(true);

    expect(kernelFacade.getService(module3Id)).toEqual(3);
  });

  it('unloads modules from the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    kernelFacade.loadModules(baseModules);
    kernelFacade.unloadModules(baseModules);

    expect((<any>kernelFacade)._loadedUserModules.get(module1Id)).toEqual(false);
    expect((<any>kernelFacade)._loadedUserModules.get(module2Id)).toEqual(false);
  });

  it('get all services with a same id', () => {
    const kernelFacade = new InversifyKernelFacade();

    const moduleId = Symbol('module');
    const myModule = new KernelModule((bind: interfaces.Bind) => {
      bind(moduleId).toConstantValue(1);
      bind(moduleId).toConstantValue(2);
    });

    const modules: IUserModule[] = [
      {
        kernelModule: myModule,
        serviceId: moduleId,
      },
    ];

    kernelFacade.loadModules(modules);

    expect((<any>kernelFacade)._loadedUserModules.get(moduleId)).toEqual(true);

    expect(kernelFacade.getAllServices(moduleId)).toEqual([1, 2]);
  });

  it('loads raw kernel module into the kernel', () => {
    const kernelFacade = new InversifyKernelFacade();

    const moduleId = Symbol('module');

    const modules: interfaces.KernelModule[] = [
      new KernelModule((bind: interfaces.Bind) => bind(moduleId).toConstantValue(1)),
    ];

    kernelFacade.loadKernelModules(modules);

    expect(kernelFacade.getService(moduleId)).toEqual(1);
  });
});

