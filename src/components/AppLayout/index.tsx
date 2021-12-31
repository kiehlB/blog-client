export type AppLayoutProps = {
  leftNav?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export type CellLayoutProps = {
  children?: React.ReactNode;
};

function MainNav({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
export default function AppLayout({
  leftNav,
  centerContent,
  rightContent,
}: AppLayoutProps) {
  return (
    <div>
      {leftNav}
      {centerContent}
      {rightContent}
    </div>
  );
}
function LeftNav({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
function CenterContent({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}
function RightContent({ children }: CellLayoutProps) {
  return <div>{children}</div>;
}

AppLayout.MainNav = MainNav;
AppLayout.LeftNav = LeftNav;
AppLayout.CenterContent = CenterContent;
AppLayout.RightContent = RightContent;
