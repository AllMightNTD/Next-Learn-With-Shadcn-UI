export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[100vh]">
      <h1>header</h1>
      {children}
      <h1>footer</h1>
    </div>
  );
}
