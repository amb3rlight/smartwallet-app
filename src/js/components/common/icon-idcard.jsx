import React from 'react'
import Radium from 'radium'

const IconIdCard = (props) => {
  return (
    <svg x="0px" y="0px" viewBox="0 0 24 24"
      style={{height: '24px', width: '24px', position: 'absolute'}}>
      <path style={{fill: props.color}}
        d="M21.3057,4.1913H2.6943c-1.0797,0-1.9551,0.8753-1.9551,
        1.9551v11.7071c0,1.0798,0.8754,1.9551,1.9551,1.9551h18.6115c1.0797,
        0,1.9551-0.8753,1.9551-1.9551V6.1464C23.2608,
        5.0667,22.3854,4.1913,21.3057,4.1913z M9.7728,
        11.8147c0,0.7507-0.6142,1.3649-1.3649,1.3649H3.5176c-0.7507,
        0-1.3649-0.6142-1.3649-1.3649V6.9244c0-0.7507,0.6143-1.3649,
        1.3649-1.3649H8.408c0.7507,0,1.3649,0.6143,
        1.3649,1.3649V11.8147z M20.3877,
        17.4092h-8.6104c-0.2998,0-0.5425-0.2432-0.5425-0.543s0.2427-0.543,
        0.5425-0.543h8.6104c0.2998,0,0.543,0.2432,0.543,
        0.543S20.6875,17.4092,20.3877,17.4092z M20.3877,
        14.9961h-8.6104c-0.2998,0-0.5425-0.2432-0.5425-0.543s0.2427-0.543,
        0.5425-0.543h8.6104c0.2998,0,0.543,0.2432,0.543,
        0.543S20.6875,14.9961,20.3877,14.9961z M20.3877,12.583h-8.6104c-0.2998,
        0-0.5425-0.2427-0.5425-0.5425s0.2427-0.5425,
        0.5425-0.5425h8.6104c0.2998,0,0.543,0.2427,0.543,0.5425S20.6875,12.583,
        20.3877,12.583z" />
    </svg>
  )
}
IconIdCard.propTypes = {
  color: React.PropTypes.string
}
export default Radium(IconIdCard)