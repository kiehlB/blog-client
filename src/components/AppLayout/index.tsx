export type AppLayoutProps = {
  first?: React.ReactNode;
  second?: React.ReactNode;
  third?: React.ReactNode;
};

export type CellLayoutProps = {
  children?: React.ReactNode;
};

function MainNav({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
export default function AppLayout({ first, second, third }: AppLayoutProps) {
  return (
    <div>
      {first}
      {second}
      {third}
    </div>
  );
}
function First({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
function Second({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
function Third({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}

AppLayout.MainNav = MainNav;
AppLayout.First = First;
AppLayout.Second = Second;
AppLayout.Third = Third;
