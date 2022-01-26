import React, { useRef, useState } from "react"
import { animated, useSpring } from "react-spring"
import NewBlackCircle from "../images/NewBlackCircle.png"
import "../styles/bubbleStyle.css"






export default function ImageBubble() {
	const [open, toggle] = useState(false)
	const effs = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })
	const overEff = useSpring({ height: open? 350:300,border:"solid",borderColor:"blue" })

	

	return (
		<div className="bubbles">
			<animated.div style={effs}>
				<animated.img style={overEff} src={NewBlackCircle} onMouseOver={() => toggle(!open)} onMouseOut={() => toggle(!open)} />

			</animated.div>
			<div className="bubble-text">
				<h2>text</h2>
			</div>
		</div>
	)


}