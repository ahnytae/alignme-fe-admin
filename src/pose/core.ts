import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export type PoseData = {
  leftElbow: number | null;
  rightElbow: number | null;
  leftShoulder: number | null;
  rightShoulder: number | null;
  leftKnee: number | null;
  rightKnee: number | null;
  leftHip: number | null;
  rightHip: number | null;
  leftAnkle: number | null;
  rightAnkle: number | null;
  spine: number | null;
  shoulderWidth: number | null;
  hipWidth: number | null;
};

export class Core {
  static poseLandmarker: PoseLandmarker | undefined;

  constructor() {}

  static async initPoseLandmarker() {
    if (Core.poseLandmarker) {
      throw new Error('PoseLandmarker already initialized');
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

// if (Core.runningMode === "VIDEO" && Core.poseRunning === true) {
//   window.requestAnimationFrame(this.start);
// }
