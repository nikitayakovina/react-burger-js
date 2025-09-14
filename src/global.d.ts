import 'react';

declare module 'react' {
  // делаем JSX.Element подтипом ReactNode
  interface ReactNode {}
  namespace JSX {
    // теперь JSX.Element наследует ReactNode
    type Element = ReactNode;
  }
}
