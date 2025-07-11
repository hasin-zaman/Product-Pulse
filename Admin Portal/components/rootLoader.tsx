'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image'

export default function RootLoader() {

    const pulseAnimation = keyframes`
    100% {
      border: 50px solid rgba(169, 169, 169, 0);
      height: 230px;
      width: 230px
    }
  `;

  const Page = styled.div`
    height: 100vh;
    background-color: #121212;
  `; 

  const Ripple = styled.div`
    height: 140px;
    width: 140px;
    border-radius: 50%;
    border: 8px solid rgba(169, 169, 169);
    animation: ${pulseAnimation} 2s ease-out infinite;
    animation-delay: calc(0.5s * var(--i));
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;

  const Circle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  return (
    <>
    <Page>
        <Circle>
            <div className='rounded-full bg-slate-50 w-32 h-32 center'>
                <Image src='/assets/images/logo.png' alt='Logo' width={120} height={120} className='object-contain' />
            </div>
        </Circle>
    </Page>
    <Ripple className='ripple'/>
    <Ripple className='ripple'/>
    <Ripple className='ripple'/>
    <Ripple className='ripple'/>
    </>
  );
}
