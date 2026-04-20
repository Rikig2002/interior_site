import { useMemo, useState } from 'react'

const fallbackImage =
  'https://images.unsplash.com/photo-1616594039964-3f0d30c9f8e7?auto=format&fit=crop&w=1400&q=80'

function ImageGallery({ images = [], projectTitle = 'Project' }) {
  const galleryImages = useMemo(() => (Array.isArray(images) && images.length ? images : [fallbackImage]), [images])
  const [activeIndex, setActiveIndex] = useState(0)

  const activeImage = galleryImages[activeIndex] || fallbackImage

  return (
    <section className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <img
          src={activeImage}
          alt={projectTitle}
          className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[460px]"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = fallbackImage
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-lg border transition ${
              index === activeIndex ? 'border-accent ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'
            }`}
            aria-label={`Show image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${projectTitle} ${index + 1}`}
              loading="lazy"
              className="h-16 w-full object-cover sm:h-20"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = fallbackImage
              }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

export default ImageGallery
