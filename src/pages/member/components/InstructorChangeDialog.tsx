import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { ChangeInstrucrtors } from '../memberListPage';
import { changeInstructor } from '@/api/users';

interface InstructorChangeDialogProps {
  children: ReactNode;
  instructors: ChangeInstrucrtors[];
  selecteMemberId: string;
}

const InstructorChangeDialog = ({ children, instructors, selecteMemberId }: InstructorChangeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // 현재 모달 단계 ('select', 'confirm', 'complete')
  const [currentStep, setCurrentStep] = useState<'select' | 'confirm' | 'complete'>('select');
  // 선택한 강사
  const [selectedInstructor, setSelectedInstructor] = useState<ChangeInstrucrtors | null>(null);

  const openDialog = () => {
    setIsOpen(true);
    setCurrentStep('select');
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedInstructor(null); // 선택한 강사 초기화
  };

  const handleSelectInstructor = (instructor: ChangeInstrucrtors) => {
    setSelectedInstructor(instructor);
    setCurrentStep('confirm');
  };

  const handleConfirmChange = async () => {
    // 강사 변경 로직 수행

    await changeInstructor(selectedInstructor?.id || '', selecteMemberId);
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
                {instructors?.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => handleSelectInstructor(instructor)}
                  >
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          alt="instructor-profileImage"
                          src={instructor.profileImage || ''}
                          className="inline-block h-14 w-14 rounded-full border border-border-primary"
                        />
                        <p className="text-label-large text-content-primary ">{instructor.name}</p>
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
              <p>{selectedInstructor?.name}님으로 변경하시겠습니까?</p>
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
