import Image from 'next/image';
import Link from 'next/link';

export default function SolarLogo({ href = "/painel-do-defensor" }: Readonly<{ href?: string }>) {
  return (
    <Link href={href}>
      <Image
        src='/v2/assets/images/solar-logo.png'
        width={145}
        height={77}
        alt="Logo"
        priority
        style={{ width: 'auto', height: 'auto' }}
      />      
    </Link>
  );
}
