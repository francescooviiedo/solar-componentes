import Image from 'next/image';
import Link from 'next/link';

export default function SolarLogoMobile({ href = "/painel-do-defensor" }: Readonly<{ href?: string }>) {
  return (
    <Link href={href}>
      <Image
        src={'/v2/assets/images/logo-mobile2.png'}
        width={60}
        height={60}
        alt="Logo"
        priority
      />        
    </Link>
  );
}
