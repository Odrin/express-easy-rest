import {Metadata} from "../../metadata/metadata";
import {AUTH_ANONYMOUS_METADATA_KEY} from "../../metadata/metadata-keys";

export function AllowAnonymous(): MethodDecorator {
  return function (target: Object | Function, propertyKey?: string | symbol, parameterIndex?: number) {
    Metadata.define(AUTH_ANONYMOUS_METADATA_KEY, true, target, propertyKey);
  }
}
