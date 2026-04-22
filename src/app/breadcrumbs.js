'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './breadcrumbs.css';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { label: 'HOME', href: '/' },
    ...segments.map((segment, index) => ({
      label: capitalize(segment),
      href: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <div className="breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <span key={item.href || index} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="breadcrumb-current">{item.label}</span>
          ) : (
            <Link href={item.href} className="breadcrumb-link">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}