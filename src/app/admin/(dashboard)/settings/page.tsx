import PasswordChangeForm from '@/components/admin/PasswordChangeForm'

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>설정</h1>
      <div className="max-w-md">
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text)' }}>비밀번호 변경</h2>
        <PasswordChangeForm />
      </div>
    </div>
  )
}
