"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const bodyTextColor = '#d1d5db';
  const secondaryTextColor = '#bcbcbc';

  // Hide footer on bizplan pages — they have their own self-contained layout
  if (pathname.startsWith('/bizplan')) return null;

  return (
    <footer style={{ background: '#181f2a', color: '#fff', marginTop: '3rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2.5rem 2rem 1.5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        {/* Useful Links */}
        <div>
          <h3 style={{ fontFamily: 'Montserrat', fontWeight: 700, marginBottom: '1rem' }}>NovaVoice</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/use-cases/restaurant">Restaurants</Link></li>
            <li><Link href="/use-cases/home-services">Home Services</Link></li>
            <li><Link href="/use-cases/veterinarian">Veterinary</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/#get-started">Get Started</Link></li>
          </ul>
        </div>
        {/* About us */}
        <div style={{ minWidth: '250px', maxWidth: '350px' }}>
          <h3 style={{ fontFamily: 'Montserrat', fontWeight: 700, marginBottom: '1rem' }}>About Us</h3>
          <p style={{ color: bodyTextColor, marginBottom: '1rem' }}>
            NovaVoice is an AI phone agent by Innovaas Solutions that answers every call, books appointments, and never misses a business opportunity — 24/7/365.
          </p>
          <p style={{ color: bodyTextColor }}>
            <a href="https://innovaas.co" target="_blank" rel="noopener noreferrer" style={{ color: '#F25C05' }}>
              Visit Innovaas Solutions
            </a>
          </p>
        </div>
        {/* Connect with us */}
        <div>
          <h3 style={{ fontFamily: 'Montserrat', fontWeight: 700, marginBottom: '1rem' }}>Connect with us</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FaEnvelope style={{ color: '#F25C05' }} />
            <a href="mailto:info@innovaas.co" style={{ color: bodyTextColor }}>info@innovaas.co</a>
          </div>
        </div>
      </div>
      <div style={{ background: '#131722', color: secondaryTextColor, textAlign: 'center', padding: '0.75rem 0', fontSize: '1rem' }}>
        Copyright © Innovaas Solutions Pte. Ltd. 2026
      </div>
    </footer>
  );
}
