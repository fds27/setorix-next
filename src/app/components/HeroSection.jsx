import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = ({ data }) => {
  return (
    <section className="hero">
      <div className="_container">
        <div className="hero__body">
          <div className='fadeInUp'>
            <h2>{data.subtitle}</h2>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <div className="buttons">
              <Link href="#contacts" className="green-button">
                Order an audit
              </Link>
              <Link href="#services" className="outlined-button">
                More about services
              </Link>
            </div>
          </div>
          {data.image && <Image className='fadeInUp' src={`https://cms.setorix.com/${data.image.url}`} alt={data.title} width={420} height={420} />}
        </div>

        <div className="hero__advantages">
          {data.advantages?.map((advantage, index) => (
            <div key={index} className="advantage fadeInUp">
              <h3>{advantage.value}</h3>
              <p>{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
