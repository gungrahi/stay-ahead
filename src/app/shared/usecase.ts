import { InfraFailure } from "./error/custom_failures";
import { Either } from "./error/either_left_right";

export interface Usecase<T, P> {
  execute(param: P): Promise<Either<InfraFailure, T>>;
}

export class NoParam {}
