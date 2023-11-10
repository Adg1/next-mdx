import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Mdx } from "@/components/Mdx";

import { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";

interface DocPageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(params: { slug: string }) {
  let slug = params.slug;
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6" />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10"></div>
      </div>
    </main>
  );
}
