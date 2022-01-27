import { isAnimatedString } from "@react-spring/shared"
import React, { useRef, useState } from "react"
import { animated, useSpring } from "react-spring"

import "../styles/bubbleStyle.css"






export default function ImageBubble(props) {
	const [open, toggle] = useState(false)
	const effs = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })
	const overEff = useSpring({ opacity: open ? 1 : props.startOp })



	return (
		<div className="bubbles">
			<animated.div style={effs}>
				<animated.div style={overEff} onMouseOver={() => toggle(!open)} onMouseOut={() => toggle(!open)}>
					<img src={props.image}  />
					<div className="bubble-text">
						<animated.h2>{props.label}</animated.h2>
						</div>
				</animated.div>
				</animated.div >
			
		</div >
	)


}