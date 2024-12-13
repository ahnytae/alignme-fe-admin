import { DrawingUtils, PoseLandmarker } from '@mediapipe/tasks-vision';
import { Core, PoseData } from './core';
import { CalculatePose, SkletonData } from './CalculatePose';

export class ImagePoseLandmarker extends Core {
  private static isPoseRunning: Boolean;

  constructor() {
    super();

    new Core();
  }

  static init() {
    if (ImagePoseLandmarker.isPoseRunning) {
      return;
    }

    new ImagePoseLandmarker();
    ImagePoseLandmarker.isPoseRunning = true;
  }

  static stop() {
    ImagePoseLandmarker.isPoseRunning = false;
  }

  static async start(imageElement: HTMLImageElement): Promise<SkletonData[] | null> {
    let val: SkletonData[] | null = null;

    await Core.initPoseLandmarker();
    await ImagePoseLandmarker.poseLandmarker?.setOptions({
      runningMode: 'IMAGE',
    });

    // if (!ImagePoseLandmarker.imageElement) {
    //   throw new Error('Image or Canvas element not initialized');
    // }

    // if (ImagePoseLandmarker.isPoseRunning) {
    //   console.error('PoseLandmarker is already running');
    //   return;
    // }

    Core.poseLandmarker?.detect(imageElement, (result) => {
      for (const landmark of result.landmarks) {
        // 자세 비교
        val = CalculatePose.isPoseMatchingImage(
          result.worldLandmarks[0],
          // pilte[0]
        ) as any;

        if (!val) {
          val = null;
        }
      }
    });
    return val;
  }
}
