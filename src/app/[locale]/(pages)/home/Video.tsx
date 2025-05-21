// "use client"

// import { useState, useRef, useCallback, useEffect } from "react"
// import { Typography, Space, Card, Button, Slider, Tooltip, Spin } from "antd"
// import {
//   PlayCircleOutlined,
//   PauseCircleOutlined,
//   StepForwardOutlined,
//   SoundOutlined,
//   MuteOutlined,
//   InfoCircleOutlined,
//   ExpandOutlined,
//   PictureOutlined,
// } from "@ant-design/icons"
// import ReactPlayer from "react-player"
// import { debounce } from "lodash"

// const { Title, Paragraph } = Typography

// interface PlayerProgress {
//   played: number
//   playedSeconds: number
//   loaded: number
//   loadedSeconds: number
// }

// export default function Video() {
//   const [playing, setPlaying] = useState(false)
//   const [volume, setVolume] = useState(0.8)
//   const [muted, setMuted] = useState(false)
//   const [played, setPlayed] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const [seeking, setSeeking] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const playerRef = useRef<ReactPlayer>(null)

//   // Format time in MM:SS
//   const formatTime = (seconds: number): string => {
//     if (isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const remainingSeconds = Math.floor(seconds % 60)
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
//   }

//   // Handle play/pause toggle
//   const handlePlayPause = useCallback(() => {
//     setPlaying(prev => !prev)
//   }, [])

//   // Handle volume change with debouncing
//   const handleVolumeChange = useCallback(
//     debounce((value: number) => {
//       setVolume(value / 100)
//       setMuted(value === 0)
//     }, 100),
//     []
//   )

//   // Toggle mute state
//   const handleToggleMute = useCallback(() => {
//     setMuted(prev => !prev)
//   }, [])

//   // Handle progress bar seeking
//   const handleSeekChange = useCallback((value: number) => {
//     setPlayed(value / 100)
//   }, [])

//   const handleSeekMouseDown = useCallback(() => {
//     setSeeking(true)
//   }, [])

//   const handleSeekMouseUp = useCallback((value: number) => {
//     setSeeking(false)
//     if (playerRef.current) {
//       playerRef.current.seekTo(value / 100, "fraction")
//     }
//   }, [])

//   // Handle video progress
//   const handleProgress = useCallback(({ played }: PlayerProgress) => {
//     if (!seeking) {
//       setPlayed(played)
//     }
//   }, [seeking])

//   // Set video duration
//   const handleDuration = useCallback((dur: number) => {
//     setDuration(dur)
//     setLoading(false)
//   }, [])

//   // Handle errors
//   const handleError = useCallback((err: Error) => {
//     setError("Failed to load video. Please try again.")
//     setLoading(false)
//     console.error("Video error:", err)
//   }, [])

//   // Handle keyboard accessibility
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.code === "Space") {
//         e.preventDefault()
//         handlePlayPause()
//       }
//     }
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [handlePlayPause])

//   const currentTime = played * duration
//   const demoVideoUrl = "https://www.youtube.com/watch?v=yVYQeDhAQWk"

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <Space direction="vertical" size="large" className="w-full">
//         <div className="text-center">
//           <Title level={2} style={{ color: "#135786", marginBottom: "16px" }}>
//             See How Easy It Is!
//           </Title>
//           <Paragraph style={{ color: "#5d5d5d", fontSize: "16px" }}>
//             Watch our step-by-step video tutorial to understand the full admission process,
//             from searching schools to submitting your application.
//           </Paragraph>
//         </div>

//         <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: "8px", overflow: "hidden" }}>
//           <div className="relative">
//             {error && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
//                 {error}
//               </div>
//             )}
//             {loading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                 <Spin size="large" />
//               </div>
//             )}
            
//             <div className="relative aspect-video bg-black">
//               <ReactPlayer
//                 ref={playerRef}
//                 url={demoVideoUrl}
//                 width="100%"
//                 height="100%"
//                 playing={playing}
//                 volume={volume}
//                 muted={muted}
//                 onProgress={handleProgress}
//                 onDuration={handleDuration}
//                 onError={handleError}
//                 progressInterval={100}
//                 style={{ position: "absolute", top: 0, left: 0 }}
//                 config={{
//                   youtube: {
//                     playerVars: {
//                       controls: 0,
//                       showinfo: 0,
//                       rel: 0,
//                       modestbranding: 1,
//                       iv_load_policy: 3,
//                     },
//                   },
//                 }}
//               />

//               {/* Info button */}
//               <Tooltip title="Video information">
//                 <Button
//                   type="text"
//                   shape="circle"
//                   icon={<InfoCircleOutlined />}
//                   className="absolute top-4 right-4 bg-white/80 z-10"
//                   aria-label="Video information"
//                 />
//               </Tooltip>

//               {/* Video controls */}
//               <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2 z-10">
//                 <Slider
//                   value={played * 100}
//                   onChange={handleSeekChange}
//                   onAfterChange={handleSeekMouseUp}
//                   onMouseDown={handleSeekMouseDown}
//                   tooltip={{ formatter: () => formatTime(played * duration) }}
//                   className="mb-2"
//                   trackStyle={{ backgroundColor: "#ee1a26" }}
//                   railStyle={{ backgroundColor: "#c4c4c4" }}
//                   aria-label="Video progress"
//                 />

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Button
//                       type="text"
//                       icon={playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
//                       onClick={handlePlayPause}
//                       className="text-white p-0"
//                       aria-label={playing ? "Pause video" : "Play video"}
//                     />
//                     <Button
//                       type="text"
//                       icon={<StepForwardOutlined />}
//                       className="text-white p-0"
//                       aria-label="Skip forward"
//                     />
//                     <Button
//                       type="text"
//                       icon={muted ? <MuteOutlined /> : <SoundOutlined />}
//                       onClick={handleToggleMute}
//                       className="text-white p-0"
//                       aria-label={muted ? "Unmute" : "Mute"}
//                     />
//                     <Slider
//                       className="w-24"
//                       value={muted ? 0 : volume * 100}
//                       onChange={handleVolumeChange}
//                       tooltip={{ formatter: (value) => `${value}%` }}
//                       trackStyle={{ backgroundColor: "#ee1a26" }}
//                       railStyle={{ backgroundColor: "#c4c4c4" }}
//                       aria-label="Volume control"
//                     />
//                     <span className="text-white text-sm">
//                       {formatTime(currentTime)} / {formatTime(duration)}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <Button
//                       size="small"
//                       className="bg-[#ee1a26] text-white border-none h-5 flex items-center"
//                       aria-label="HD quality"
//                     >
//                       HD
//                     </Button>
//                     <Button
//                       type="text"
//                       icon={<PictureOutlined />}
//                       className="text-white p-0"
//                       aria-label="Picture-in-picture"
//                     />
//                     <Button
//                       type="text"
//                       className="text-white p-0 flex items-center justify-center"
//                       aria-label="Theater mode"
//                     >
//                       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
//                         <path d="M3 9H7V15H3V9Z" stroke="currentColor" strokeWidth="2" />
//                         <path d="M17 9H21V15H17V9Z" stroke="currentColor" strokeWidth="2" />
//                         <rect x="7" y="5" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
//                       </svg>
//                     </Button>
//                     <Button
//                       type="text"
//                       icon={<ExpandOutlined />}
//                       className="text-white p-0"
//                       aria-label="Full screen"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </Space>
//     </div>
//   )
// }