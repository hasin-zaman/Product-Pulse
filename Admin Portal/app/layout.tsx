import React, { ReactNode } from 'react'
import '@styles/globals.css';

export const metadata = {
  title: 'Admin Portal',
  description: 'Admin portal for managing products'
}

interface Props {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
