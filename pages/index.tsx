import { Inter } from 'next/font/google'
import { useEffect, useState, useRef } from 'react'
import Moveable from "react-moveable";
// @ts-ignore
import { useToImage } from '@hcorta/react-to-image';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [target, setTarget]: any = useState(null)
  const [targetImage, setTargetImage]: any = useState(null)

  const { ref, isLoading, getSvg } = useToImage()

  const moveableRef: any = useRef(null)

  const onInputChange = (e: any) => {
    const file: any = e?.target?.files[0]
    if (file) {
      setTarget(document.querySelector(".target"))
      setTargetImage(URL.createObjectURL(file))
    }
  }

  const onEditButtonClick = () => {
    setTarget(document.querySelector(".target"))
  }

  const onSaveButtonClick = () => {
    setTarget(null)
  }

  useEffect(() => {
    // setTarget(document.querySelector(".target"))
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
        }: any) => {
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
      <div ref={ref}>
        <img src="/images/t1.webp" />
          <div className="container">
            <div className="target" style={{ width: 300 }}>
              <img style={{ width: '100%', height: '100%' }} src={targetImage} />
            </div>
          </div>
      </div>
     <div className='flex flex-col gap-2'>
      <input onChange={onInputChange} type='file' />
      <div className='flex gap-5 w-full justify-between'>
        <button className='bg-orange-300 px-8 py-1 w-1/2' onClick={onEditButtonClick}>Edit</button>
        <button className='bg-green-300 px-8 py-1 w-1/2' onClick={onSaveButtonClick}>Save</button>
      </div>
      <button className='bg-green-300 px-8 py-1' onClick={getSvg}>Download Photo</button>
      {isLoading && 'loading...'}
     </div>
    </main>
  )
}
