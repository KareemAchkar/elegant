type Props = {
  myVid : string
}

export const MyVideo:React.FC<Props> = ({myVid}) => {
  return (
    <section className='video-container'>
      <div className='lazy-video-container'>
        <video src={myVid} autoPlay muted loop></video>
      </div>
    </section>
  )
}