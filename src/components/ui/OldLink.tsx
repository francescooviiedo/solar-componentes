import Link from "next/link";

type Props = Readonly<{
  baseUrl?: string;
  href: string;
  children: React.ReactNode;
}>

export default function OldLink({ href, children, baseUrl }: Readonly<Props>) {
  return (
    <Link href={baseUrl ? `${baseUrl}/${href}` : href} passHref target="_blank">
      {children}
    </Link>
  );
}
