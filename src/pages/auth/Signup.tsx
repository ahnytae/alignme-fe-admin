import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Signup = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedIndex(parseInt(e.currentTarget.value))
  }

  return (
    <main className="flex size-full items-center justify-center">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-large">가입 유형을 선택해주세요.</h2>
          <p className="text-paragraph-base text-content-secondary">어떤 역할로 가입할까요?</p>
        </div>

        {/** 가입 유형 */}
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <p className="text-label-base text-content-secondary">강사로 수업을 제공할게요.</p>
            <Button value={0} variant="outline" className="text-label-base text-content-primary" onClick={handleSelect}>
              강사로 가입하기
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-base text-content-secondary">레슨장을 운영중이에요.</p>
            <Button value={1} variant="outline" className="text-label-base text-content-primary" onClick={handleSelect}>
              레슨장으로 가입하기
            </Button>
          </div>
        </div>
        <Button variant="primary" disabled={selectedIndex === null}>
          확인
        </Button>
      </div>
    </main>
  )
}

export default Signup
