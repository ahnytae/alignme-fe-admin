import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export type PoseData = {
  leftElbow: number;
  rightElbow: number;
  leftShoulder: number;
  rightShoulder: number;
  leftKnee: number;
  rightKnee: number;
  leftHip: number;
  rightHip: number;
  leftAnkle: number;
  rightAnkle: number;
  spine: number;
  shoulderWidth: number;
  hipWidth: number;
};

export class Core {
  static poseLandmarker: PoseLandmarker | undefined;

  constructor() {
    if (Core.poseLandmarker) {
      throw new Error('PoseLandmarker already initialized');
    }
  }

  static async initPoseLandmarker() {
    if (Core.poseLandmarker) {
      return;
    }

    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    );
    Core.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: 'GPU',
      },
      numPoses: 1,
    });
  }
}
