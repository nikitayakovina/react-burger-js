export const SET_TAB = 'SET_TAB' as const;

export type ITabAction = {
  readonly type: typeof SET_TAB;
  readonly tab: 'bun' | 'main' | 'sauce';
};

export type TTabActions = ITabAction;
