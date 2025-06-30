import { useEffect, useState } from 'react'

export default function EarthInfo() {
  const [epicData, setEpicData] = useState(null)

  useEffect(() => {
    fetch('https://nasa-backend-tm30.onrender.com/api/epic')
      .then(res => res.json())
      .then(data => setEpicData(data))
      .catch(err => console.error('Fetch EPIC failed:', err))
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/textures/bg1.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
      NASA EPIC Earth View
      </h1>

      {epicData ? (
        <>
          <img
            src={epicData.imageUrl}
            alt="Earth from NASA EPIC"
            style={{
              width: '55%',
              maxWidth: '600px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          />
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>{epicData.caption}</p>
          <p><strong>Date:</strong> {epicData.date}</p>
        </>
      ) : (
        <p style={{ fontSize: '1.2rem' }}>Loading image...</p>
      )}
    </div>
  )
}
