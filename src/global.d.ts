import 'react';

declare module 'react' {
  interface ReactNode {}
  namespace JSX {
    type Element = ReactNode;
  }
}
