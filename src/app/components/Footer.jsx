import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="_container">Companyname © {currentYear}. All rights reserved</div>
    </footer>
  )
}

export default Footer
