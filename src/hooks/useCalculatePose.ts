import { PoseData } from '@/pose/core';
import { ImagePoseLandmarker } from '@/pose/ImagePoseLandmarker';
import { useEffect, useState } from 'react';

export default function useCalculatePose() {
  async function executePose(args: any, onSuccess: (data: PoseData) => PoseData, onError: (msg: string) => string) {
    const pose = new ImagePoseLandmarker(args, onSuccess, onError);
    await pose.start();
  }

  return { executePose };
}
