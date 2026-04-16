'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BannerItem {
  id: string
  type: 'webtoon' | 'webnovel'
  title: string
  description: string
  thumbnail: string
  badge?: string
}

interface FeaturedBannerProps {
  items: BannerItem[]
}

export default function FeaturedBanner({ items }: FeaturedBannerProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '21/8' }}>
      {items.map((item, i) => (
        <Link
          key={item.id}
          href={`/${item.type}/${item.id}`}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            {item.badge && (
              <span className="inline-block mb-2 text-xs font-bold px-2 py-0.5 rounded bg-white text-black w-fit">
                {item.badge}
              </span>
            )}
            <h2 className="text-2xl font-bold text-white line-clamp-1">{item.title}</h2>
            <p className="mt-1 text-sm text-white/70 line-clamp-2 max-w-md">{item.description}</p>
          </div>
        </Link>
      ))}

      {/* 인디케이터 */}
      {items.length > 1 && (
        <div className="absolute bottom-4 right-6 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i) }}
              className={`rounded-full transition-all ${i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
              aria-label={`${i + 1}번 배너`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
