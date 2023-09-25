/** Числовой и строковый идентификатор */
export type TVmSelectIdIntAndStr = number | string;
/** Числовой идентификатор */
export type TVmSelectIdInt = number;

export type TEmitOnClickEvent = 'open' | 'hide';

export interface IVmSelectOptionIntAndStr {
  /** Идентификатор */
  id: TVmSelectIdIntAndStr;
  /** Значение */
  text: string;
}

export interface IVmSelectOptionInt {
  /** Идентификатор */
  id: TVmSelectIdInt;
  /** Значение */
  text: string;
}
