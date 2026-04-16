'use client'

import { useState } from 'react'

interface CoinPackage {
  id: string
  price: number
  coins: number
  bonusCoins: number
  label?: string | null
}

interface CoinBalanceProps {
  paidBalance: number
  bonusBalance: number
  packages: CoinPackage[]
}

export default function CoinBalance({ paidBalance, bonusBalance, packages }: CoinBalanceProps) {
  const [showCharge, setShowCharge] = useState(false)
  const total = paidBalance + bonusBalance

  return (
    <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* 잔액 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>보유 코인</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              {total.toLocaleString()}
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>코인</span>
          </div>
          <div className="flex gap-3 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>유료 {paidBalance.toLocaleString()}</span>
            <span>·</span>
            <span>보너스 {bonusBalance.toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={() => setShowCharge((v) => !v)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
        >
          충전
        </button>
      </div>

      {/* 충전 패키지 */}
      {showCharge && (
        <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>충전 패키지 선택</p>
          <div className="grid grid-cols-2 gap-2">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                className="relative flex flex-col items-center py-3 px-2 rounded-lg border transition-colors hover:border-[var(--color-text)]"
                style={{ borderColor: 'var(--color-border)' }}
                onClick={() => alert(`${pkg.price.toLocaleString()}원 결제 (토스페이먼츠 연동 예정)`)}
              >
                {pkg.label && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-text)] text-[var(--color-bg)]">
                    {pkg.label}
                  </span>
                )}
                <span className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  {pkg.coins.toLocaleString()}
                </span>
                {pkg.bonusCoins > 0 && (
                  <span className="text-[11px] text-green-500 font-medium">
                    +{pkg.bonusCoins.toLocaleString()} 보너스
                  </span>
                )}
                <span className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {pkg.price.toLocaleString()}원
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] mt-3" style={{ color: 'var(--color-text-muted)' }}>
            유료 코인 소진 후 보너스 코인이 사용됩니다. 보너스 코인은 환불되지 않습니다.
          </p>
        </div>
      )}
    </div>
  )
}
