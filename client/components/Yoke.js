
import React from 'react'
import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut, Animator } from "react-scroll-motion";

const Yoke = () => {
  
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    
<div className='bg-black text-white'>
<ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "30px" }} className='hidden'>Let me show you scroll animation 😀</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={ZoomInScrollOut}>
      <span style={{ fontSize: "40px" }}>Unleash the true power of AI</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={FadeUp}>
      <span style={{ fontSize: "40px" }}>Make your work 100X easier</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky())}>
      <span style={{ fontSize: "40px" }} className='text-white'>Join us</span>
      <br/>
      <span style={{ fontSize: "30px" }} className='text-white'>
       Make you're own custom bot
      </span>
    </Animator>
  </ScrollPage>
  
</ScrollContainer>
</div>
  )
}

export default Yoke