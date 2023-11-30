import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Circle cx={17} cy={17} r={14.5} stroke="#000" strokeWidth={5} />
    <Circle
      cx={33}
      cy={33}
      r={15.5}
      fill="#000"
      stroke="#000"
      strokeWidth={3}
    />
    <Circle cx={6} cy={44} r={4.5} stroke="#000" strokeWidth={3} />
    <Circle cx={44} cy={6} r={4.5} stroke="#000" strokeWidth={3} />
  </Svg>
)
export default SvgComponent
