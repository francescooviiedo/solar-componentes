import Link from "next/link";

type Props = Readonly<{
  href: string;
  children: React.ReactNode;
}>

export default function OldLink({ href, children }: Readonly<Props>) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${href}`} passHref target="_blank">
      {children}
    </Link>
  );
}
