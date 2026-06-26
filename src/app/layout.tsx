import './globals.css';

export const metadata = {
  title: 'ScoutCore',
  description: 'Football Intelligence Platform by Onur Baş',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><body>{children}</body></html>;
}
