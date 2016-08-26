import {Metadata} from "../../metadata/metadata";
import {AUTH_ROLES_METADATA_KEY} from "../../metadata/metadata-keys";

export function Authorize(...roles: string[]): ClassDecorator & MethodDecorator {
  return function (target: Object | Function, propertyKey?: string | symbol, parameterIndex?: number) {
    Metadata.define(AUTH_ROLES_METADATA_KEY, roles, target, propertyKey);
  };
}
