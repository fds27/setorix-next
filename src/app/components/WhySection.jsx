import Image from 'next/image'
import React from 'react'

const WhySection = ({data}) => {
  return (
    <section className='why' id='why-us'>
        <div className="_container">
          <h3 className='fadeInUp'>{data.why_subtitle}</h3>
          <h2 className='fadeInUp'>{data.why_title}</h2>
          <p className='fadeInUp'>{data.why_content}</p>
          <div className="reasons">
            {data.why_reasones?.map((reason, index) => (
              <div key={index} className="reason fadeInUp">
                {reason.reasone_icon && (
                  <Image
                    src={`https://cms.setorix.com/${reason.reasone_icon.url}`}
                    alt={reason.reasone_value}
                    width={44}
                    height={44}
                  />
                )}
                <h4>{reason.reasone_value}</h4>
                <p>{reason.reasone_text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default WhySection