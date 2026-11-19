import './globals.css';

export const metadata = {
  metadataBase: new URL('https://sthri-motherhood-edit.quartzpier.chatgpt.site'),
  title: 'STHRI — Maternity, with a sense of you.',
  description: 'Discover STHRI, a women’s boutique from Hosur, Tamil Nadu. Maternity silhouettes, nursing essentials and occasion wear, with personal help finding your fit.',
  openGraph: {
    title: 'STHRI — The Motherhood Edit',
    description: 'Maternity, nursing and women’s occasion wear from Hosur.',
    images: ['/assets/hero.webp'],
  },
  icons: { icon: '/assets/sthri-official.png' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
