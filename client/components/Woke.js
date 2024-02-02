
import React from 'react';🥲
import { ScrollContainer, Animator, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
const Woke = () => {
  
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <div >
      <ScrollContainer>
      <ScrollPage>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px" }} className='text-white'>
        <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
        <Animator animation={MoveIn(1000, 0)}>Nice to meet you 🙋🏻‍♀️</Animator>
        We're the new revolution
      </span>
    </div>
  </ScrollPage>
  
  </ScrollContainer>
    </div>
  )
}

export default Woke