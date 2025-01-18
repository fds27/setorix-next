import Image from 'next/image'
import React from 'react'

const ServicesSection = ({ data }) => {
  return (
    <section className="services" id='services'>
      <div className="_container">
        <h2 className="fadeInUp">{data.title}</h2>
        <p className="fadeInUp">{data.subtitle}</p>
        <div className="our-services">
          {data.ourServices?.map((service, index) => (
            <div key={index} className="service-item fadeInUp">
              {service.image && (
                <Image src={`https://setorix.vercel.app/${service.image.url}`} alt={service.title} width={186} height={186} />
              )}
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
