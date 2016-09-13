import {IExceptionFilterHandler} from "../../handlers/exception-filter-handler";
import {Metadata} from "../../metadata/metadata";
import {
  CONTROLLER_EXCEPTION_FILTER_METADATA_KEY
} from "../../metadata/metadata-keys";

export function ControllerExceptionFilter(handler: IExceptionFilterHandler): ClassDecorator {
  return function (target: Function) {
    Metadata.define(CONTROLLER_EXCEPTION_FILTER_METADATA_KEY, handler, target);
  };
}
