import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface InstructorChangeDialogProps {
  children: ReactNode;
}

const InstructorChangeDialog = ({ children }: InstructorChangeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // 현재 모달 단계 ('select', 'confirm', 'complete')
  const [currentStep, setCurrentStep] = useState<'select' | 'confirm' | 'complete'>('select');
  // 선택한 강사
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);

  const openDialog = () => {
    setIsOpen(true);
    setCurrentStep('select');
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedInstructor(null); // 선택한 강사 초기화
  };

  const handleSelectInstructor = (instructor: string) => {
    setSelectedInstructor(instructor);
    setCurrentStep('confirm');
  };

  const handleConfirmChange = () => {
    // 강사 변경 로직 수행
    console.log(`Selected Instructor: ${selectedInstructor}`);
    setCurrentStep('complete');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <DialogTrigger asChild onClick={openDialog}>
          {children}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>소속 강사 변경</DialogTitle>
          </DialogHeader>

          {/* step1:  강사 선택 */}
          {currentStep === 'select' && (
            <div>
              <ul className="flex max-h-[450px] flex-col gap-6 overflow-y-scroll pb-14">
                {['강사 A', '강사 B', '강사 C', '강사 D', '강사 E', '강사 F'].map((instructor) => (
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => handleSelectInstructor(instructor)}
                  >
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          alt=""
                          src={
                            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          }
                          className="inline-block h-14 w-14 rounded-full border border-border-primary"
                        />
                        <p className="text-label-large text-content-primary ">{instructor}</p>
                      </div>
                      <div>
                        <ChevronRight className="h-6 w-6 text-content-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* step 2: 강사 선택 최종 확인 */}
          {currentStep === 'confirm' && (
            <div>
              <p>{selectedInstructor}님으로 변경하시겠습니까?</p>
              <DialogFooter className="pt-4">
                <Button size="sm" variant="outline" className="w-full" onClick={closeDialog}>
                  취소
                </Button>
                <Button size="sm" className="w-full" onClick={handleConfirmChange}>
                  확인
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* step 3: 변경 완료 */}
          {currentStep === 'complete' && (
            <div>
              <p>소속 강사 변경되었습니다.</p>
              <DialogFooter className="pt-4">
                <Button size="sm" className="w-full" onClick={closeDialog}>
                  확인
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstructorChangeDialog;
