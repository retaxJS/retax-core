import { interfaces } from 'inversify';

export interface IUserModule {
  serviceId: Symbol;
  kernelModule: interfaces.KernelModule;
}

export interface IInversifyKernelFacade {
  getService<T>(serviceId: Symbol): T;
  getAllServices<T>(serviceId: Symbol): T[];

  loadKernelModules(modules: interfaces.KernelModule[]): void;
  loadModules(modules: IUserModule[]): void;
  unloadModules(modules: IUserModule[]): void;
}
