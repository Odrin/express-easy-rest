import {IExceptionFilterHandler} from "../../handlers/exception-filter-handler";
import {Metadata} from "../../metadata/metadata";
import {
  ACTION_EXCEPTION_FILTER_METADATA_KEY
} from "../../metadata/metadata-keys";

export function ActionExceptionFilter(handler: IExceptionFilterHandler): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    Metadata.define(ACTION_EXCEPTION_FILTER_METADATA_KEY, handler, target, propertyKey);
  };
}
