import { type CSSProperties } from 'react'
import { 
  TailSpin, 
  Audio, 
  Oval, 
  ThreeDots, 
  BallTriangle, 
  Bars, 
  Blocks, 
  CirclesWithBar, 
  Circles, 
  CircularProgress, 
  DNA, 
  InfinitySpin } from 'react-loader-spinner'

const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
}

const spinnerMap = {
  tailspin: TailSpin,
  audio: Audio,
  oval: Oval,
  threedots: ThreeDots,
  balltriangle: BallTriangle,
  bars: Bars,
  blocks: Blocks,
  circlewithbar: CirclesWithBar,
  circles: Circles,
  circularprogress: CircularProgress,
  dna: DNA,
  infinityspin: InfinitySpin,
} as const;

interface LoadingProps {
  name: keyof typeof spinnerMap;
  ariaLabel?: string;
}

const Loading = ( { name, ariaLabel } : LoadingProps ) => {
  const Spinner = spinnerMap[name];

  if (!Spinner) {
    return null; // or fallback UI
  }

  return (
    <Spinner
      height="800"
      width="800"
      color="#4fa94d"
      ariaLabel={ ariaLabel || "loading" }
      wrapperStyle={wrapperStyle}
      wrapperClass="wrapper-class"
      visible={true}
    />
  )
}

export default Loading