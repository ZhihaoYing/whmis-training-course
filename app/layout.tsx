import './globals.css';

export const metadata = {
  title: 'WHMIS 2015 & SDS Training',
  description: 'Municipal employee WHMIS training prototype'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-CA"><body>{children}</body></html>;
}
