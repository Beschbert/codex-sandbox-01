export const metadata = {
  title: "About Packr",
  description: "Learn about the philosophy behind the packing checklist wizard."
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <h1 className="text-3xl font-semibold">About Packr</h1>
      <p>
        Packr helps travelers prepare with confidence by combining curated packing presets and a smart rule
        engine. We built this project to make trip prep less stressful: answer a few quick questions, review the
        personalized checklist, and you&apos;re ready to go.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Credits</h2>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>Design inspired by community-driven travel planners.</li>
          <li>Icons from the excellent lucide icon set.</li>
          <li>Built with Next.js, Tailwind CSS, and TypeScript.</li>
        </ul>
      </section>
      <p className="text-muted-foreground">
        Packr runs entirely in your browser. No accounts, no tracking—your trips stay on this device unless you export
        them.
      </p>
    </main>
  );
}
