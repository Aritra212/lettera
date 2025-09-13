import EditorFooter from "./footer";
import EditorNavbar from "./navbar";

type Props = {
  children: React.ReactNode;
};
export default function EditorLayout({ children }: Props) {
  return (
    <section className="divide-y flex flex-col h-screen overflow-hidden">
      <EditorNavbar />
      <main className="grow">{children}</main>
      <EditorFooter />
    </section>
  );
}
