type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';
type TIconProps = {
  type: TIconTypes;
  className?: string;
  onClick?: () => void;
};
export type TCustomNavLinkProps = {
  icon: ({ type }: TIconProps) => JSX.Element;
  to: string;
  className: string;
  text: string;
};
