import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState, useRef } from 'react'
import Moveable from "react-moveable";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [target, setTarget]: any = useState(null)
  const [inputFile, setInputFile]: any = useState(null)
  const [targetImage, setTargetImage]: any = useState(null)

  const moveableRef: any = useRef(null)

  const onInputChange = (e: any) => {
    const file: any = e?.target?.files[0]
    if (file) {
      setTargetImage(URL.createObjectURL(file))
    }
    // console.log(e?.target.files)
  }

  const onEditButtonClick = () => {
    setTarget(document.querySelector(".target"))
  }

  const onSaveButtonClick = () => {
    // setTargetClass('')
    setTarget(null)
    console.log('target')
  }
  useEffect(() => {
    setTarget(document.querySelector(".target"))
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Moveable
        ref={moveableRef}
        target={target}
        container={null}
        origin={true}

        /* Resize event edges */
        edge={false}

        /* draggable */
        draggable={true}
        throttleDrag={0}
        onDragStart={({ target, clientX, clientY }) => {
            console.log("onDragStart", target);
        }}
        onDrag={({
          target,
          beforeDelta, beforeDist,
          left, top,
          right, bottom,
          delta, dist,
          transform,
          clientX, clientY,
        }: OnDrag) => {
          console.log("onDrag left, top", left, top);
          // target!.style.left = `${left}px`;
          // target!.style.top = `${top}px`;
          console.log("onDrag translate", dist);
          target!.style.transform = transform;
        }}
        onDragEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onDragEnd", target, isDrag);
        }}
        /* When resize or scale, keeps a ratio of the width, height. */
        keepRatio={true}
        resizable={true}
          throttleResize={0}
          onResizeStart={({ target , clientX, clientY}) => {
            console.log("onResizeStart", target);
          }}
          onResize={({
            target, width, height,
            dist, delta, direction,
            clientX, clientY,
          }: any) => {
            console.log("onResize", target);
            delta[0] && (target!.style.width = `${width}px`);
            delta[1] && (target!.style.height = `${height}px`);
          }}
          onResizeEnd={({ target, isDrag, clientX, clientY }) => {
            console.log("onResizeEnd", target, isDrag);
          }}
      />
      <div>
        <img src="/images/t1.webp" />
      </div>
      <div className="container">
        <div className="target" style={{ width: 300 }}>
          <img style={{ width: '100%', height: '100%' }} src={targetImage} />
        </div>
      </div>
      <input onChange={onInputChange} type='file' />
      <button onClick={onEditButtonClick}>Edit</button>
      <button onClick={onSaveButtonClick}>Save</button>

    </main>
  )
}
