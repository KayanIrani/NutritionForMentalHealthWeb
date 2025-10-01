import React from 'react'
import Pptstyles from "./css/PptRenderStyles.module.css"
const PptRender = () => {
  return (
    <div className={Pptstyles.centerBox}>
        {/* <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSsfop2WDE-wFb8jDR-L7ftGuYAnl4sLaGOcE3KzSiUriWWrcmav-oh4cFBvx9CLu7uCZGBvTa2F3kA/pubembed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" className={Pptstyles.innerContent}></iframe> */}

  <iframe loading="lazy"
    src="https://www.canva.com/design/DAGztVudS4w/MmGqkAguKEaPG2GqexESQA/view?embed" allowFullScreen="allowfullscreen" allow="fullscreen" className={Pptstyles.innerContent}>
  </iframe>
</div>
  )
}

export default PptRender