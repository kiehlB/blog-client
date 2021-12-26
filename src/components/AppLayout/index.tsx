export type AppLayoutProps = {};

function MainNav({ children }) {
  return <div>{children}</div>;
}
export default function AppLayout({ leftNav, centerContent, rightContent }) {
  return (
    <div>
      {leftNav}
      {centerContent}
      {rightContent}
    </div>
  );
}
function LeftNav({ children }) {
  return <div>{children}</div>;
}
function CenterContent({ children }) {
  return <div>{children}</div>;
}
function RightContent({ children }) {
  return <div>{children}</div>;
}

AppLayout.MainNav = MainNav;
AppLayout.LeftNav = LeftNav;
AppLayout.CenterContent = CenterContent;
AppLayout.RightContent = RightContent;
