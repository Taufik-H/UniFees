export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="ml-auto mr-auto max-w-xl p-6">{children}</section>;
}
