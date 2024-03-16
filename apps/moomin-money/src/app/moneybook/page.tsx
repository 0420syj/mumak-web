import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Moneybook`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export { default } from '@moomin-money/components/moneybook/moneybook-page';
