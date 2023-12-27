import type { SuiJsonValue, SuiMoveNormalizedType } from '../client/index.js';
export declare function isTxContext(param: SuiMoveNormalizedType): boolean;
export declare function getPureSerializationType(normalizedType: SuiMoveNormalizedType, argVal: SuiJsonValue | undefined): string | undefined;
