import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface UserOutDialogProps {
  children: React.ReactNode;
  userId: string;
  username: string;
  type: 'member' | 'instructor'; // member: 회원, instructor: 강사
  onSubmit?: (userId: string) => void;
}

const RemoveUserDialog = ({ children, userId, username, type, onSubmit }: UserOutDialogProps) => {
  const typeText = type === 'member' ? '회원' : '강사';
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handlerSubmit = (userId: string) => {
    onSubmit && onSubmit(userId);
    onClose();
  };
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogTrigger asChild onClick={openDialog}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{typeText} 내보내기</DialogTitle>
        </DialogHeader>
        <div className="text-paragraph-base text-content-secondary">
          {username} {typeText}을 내보내시겠습니까?
        </div>
        <DialogFooter>
          <Button size="sm" className="w-full" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button size="sm" className="w-full" onClick={() => handlerSubmit(userId)}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RemoveUserDialog;
