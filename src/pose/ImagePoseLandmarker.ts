import { Core, PoseData } from './core';
import { CalculatePose } from './CalculatePose';

export class ImagePoseLandmarker extends Core {
  private static isPoseRunning: Boolean;
  private static imageElement: HTMLImageElement;
  private static onSuccess: (data: any) => any;
  private static onError: (message: string) => void;

  constructor(
    imageElement: HTMLImageElement,
    onSuccess: (data: PoseData) => PoseData,
    onError: (message: string) => string,
  ) {
    super();
    console.log('!!!! isPoseRunning', ImagePoseLandmarker.isPoseRunning);
    ImagePoseLandmarker.imageElement = imageElement;
    ImagePoseLandmarker.onSuccess = onSuccess;
    ImagePoseLandmarker.onError = onError;

    new Core();
  }

  stop() {
    ImagePoseLandmarker.isPoseRunning = false;
  }

  async start() {
    if (!ImagePoseLandmarker.imageElement) {
      throw new Error('Image or Canvas element not initialized');
    }

    if (!ImagePoseLandmarker.isPoseRunning) {
      await Core.initPoseLandmarker();
      await ImagePoseLandmarker.poseLandmarker!.setOptions({
        runningMode: 'IMAGE',
      });
      ImagePoseLandmarker.isPoseRunning = true;
    }

    // if (ImagePoseLandmarker.isPoseRunning) {
    //   console.error('PoseLandmarker is already running');
    //   return;
    // }

    Core.poseLandmarker?.detect(ImagePoseLandmarker.imageElement, (result) => {
      console.log('dddd', result, ImagePoseLandmarker.imageElement);
      if (result.landmarks.length < 1 || result.worldLandmarks.length < 1) {
        ImagePoseLandmarker.onError('유효하지 않은 이미지!!!');
        return;
      }
      for (const landmark of result.landmarks) {
        // 자세 비교
        const val = CalculatePose.isPoseMatchingImage(
          result.worldLandmarks[0],
          // pilte[0]
        ) as any;

        if (!val) {
          alert('자세 부정확 함');
          return;
        }

        // save data
        ImagePoseLandmarker.onSuccess(val);
        console.log('자세 데이터:', val);
      }
    });
  }
}
