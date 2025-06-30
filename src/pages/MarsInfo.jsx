import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MarsInfo() {
  const [info, setInfo] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch('https://nasa-backend-tm30.onrender.com/api/mars/info')
      .then(res => res.json())
      .then(data => setInfo(data))
      .catch(err => console.error('Failed to fetch Mars info:', err))

    fetch('https://nasa-backend-tm30.onrender.com/api/mars/photos')
      .then(res => res.json())
      .then(data => setPhotos(data.slice(0, 3))) 
      .catch(err => console.error('Failed to fetch Mars photos:', err))
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/textures/car.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '90vh',
        weight: '180vh',
        padding: '2rem',
        color: 'white',
        width: '100vw', 
        overflow: 'hidden',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mars Overview</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          margin: '0 auto', 
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >

        {info && (
          <div
            style={{
              maxWidth: '600px',
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              lineHeight: '1.8',
              fontSize: '1rem',
              flex: '1 1 45%',
            }}
          >
            <p><strong>Name:</strong> {info.name}</p>
            <p><strong>Description:</strong> {info.description}</p>
            <p><strong>Fact:</strong> {info.fact}</p>
            <p><strong>Atmosphere:</strong> {info.atmosphere}</p>
          </div>
        )}


        {photos.length > 0 && (
          <div
            style={{
              maxWidth: '600px',
              flex: '1 1 45%',
            }}
          >
            <Slider {...sliderSettings}>
              {photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo.img_src}
                    alt={`Mars rover ${index}`}
                    style={{ width: '100%', borderRadius: '12px', maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  )
}
