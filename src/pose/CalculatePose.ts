import { Landmark } from '@mediapipe/tasks-vision';
import { PoseData } from './core';

export class CalculatePose {
  private static readonly VISIBILITY_THRESHOLD = 0.75;

  // 자세 비교를 위한 임계값 설정
  private static readonly THRESHOLDS = {
    COORDINATE: 0.15, // 좌표 차이 허용 범위
    ANGLE: 15, // 각도 차이 허용 범위 (도)
    OVERALL: 0.8, // 전체 유사도 기준 (0-1)
  };

  // 관절 인덱스
  private static readonly JOINTS = {
    // 얼굴/머리
    NOSE: 0,
    LEFT_EYE_INNER: 1,
    LEFT_EYE: 2,
    LEFT_EYE_OUTER: 3,
    RIGHT_EYE_INNER: 4,
    RIGHT_EYE: 5,
    RIGHT_EYE_OUTER: 6,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    MOUTH_LEFT: 9,
    MOUTH_RIGHT: 10,

    // 상체
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
    LEFT_PINKY: 17,
    RIGHT_PINKY: 18,
    LEFT_INDEX: 19,
    RIGHT_INDEX: 20,
    LEFT_THUMB: 21,
    RIGHT_THUMB: 22,

    // 하체
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
    LEFT_ANKLE: 27,
    RIGHT_ANKLE: 28,
    LEFT_HEEL: 29,
    RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31,
    RIGHT_FOOT_INDEX: 32,

    // 중간점(계산 필요)
    MID_SHOULDER: 33, // LEFT_SHOULDER와 RIGHT_SHOULDER의 중간
    MID_HIP: 34, // LEFT_HIP와 RIGHT_HIP의 중간
  };

  constructor() {}

  // 중간점 계산 함수 추가
  private static calculateMidpoint(pose: Landmark[], point1Index: number, point2Index: number): Landmark {
    return {
      x: (pose[point1Index].x + pose[point2Index].x) / 2,
      y: (pose[point1Index].y + pose[point2Index].y) / 2,
      z: (pose[point1Index].z + pose[point2Index].z) / 2,
      visibility: Math.min(pose[point1Index].visibility || 0, pose[point2Index].visibility || 0),
    };
  }

  /**
   * 주요 관절의 각도 계산
   */
  private static calculateJointAngles(pose: Landmark[]): Record<string, number | null> {
    // 중간점 계산
    const midShoulder = this.calculateMidpoint(pose, this.JOINTS.LEFT_SHOULDER, this.JOINTS.RIGHT_SHOULDER);

    const midHip = this.calculateMidpoint(pose, this.JOINTS.LEFT_HIP, this.JOINTS.RIGHT_HIP);

    // 계산된 중간점을 포함한 확장된 pose 배열 생성
    const poseWithMidPoints = [...pose];
    const midPointIndex = pose.length;
    poseWithMidPoints[midPointIndex] = midShoulder; // MID_SHOULDER 위치
    poseWithMidPoints[midPointIndex + 1] = midHip; // MID_HIP 위치

    return {
      // 기존 각도 계산
      leftElbow: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.LEFT_SHOULDER,
        this.JOINTS.LEFT_ELBOW,
        this.JOINTS.LEFT_WRIST,
      ),
      rightElbow: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.RIGHT_SHOULDER,
        this.JOINTS.RIGHT_ELBOW,
        this.JOINTS.RIGHT_WRIST,
      ),

      leftShoulder: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.LEFT_ELBOW, // 기준점 1: 왼쪽 팔꿈치
        this.JOINTS.LEFT_SHOULDER, // 중심점: 왼쪽 어깨
        this.JOINTS.RIGHT_SHOULDER, // 기준점 2: 오른쪽 어깨
      ),
      rightShoulder: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.RIGHT_ELBOW, // 기준점 1: 오른쪽 팔꿈치
        this.JOINTS.RIGHT_SHOULDER, // 중심점: 오른쪽 어깨
        this.JOINTS.LEFT_SHOULDER, // 기준점 2: 왼쪽 어깨
      ),
      leftKnee: this.calculateAngleIfVisible(pose, this.JOINTS.LEFT_HIP, this.JOINTS.LEFT_KNEE, this.JOINTS.LEFT_ANKLE),
      rightKnee: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.RIGHT_HIP,
        this.JOINTS.RIGHT_KNEE,
        this.JOINTS.RIGHT_ANKLE,
      ),
      leftHip: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.LEFT_SHOULDER,
        this.JOINTS.LEFT_HIP,
        this.JOINTS.LEFT_KNEE,
      ),
      rightHip: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.RIGHT_SHOULDER,
        this.JOINTS.RIGHT_HIP,
        this.JOINTS.RIGHT_KNEE,
      ),
      leftAnkle: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.LEFT_KNEE,
        this.JOINTS.LEFT_ANKLE,
        this.JOINTS.LEFT_FOOT_INDEX,
      ),
      rightAnkle: this.calculateAngleIfVisible(
        pose,
        this.JOINTS.RIGHT_KNEE,
        this.JOINTS.RIGHT_ANKLE,
        this.JOINTS.RIGHT_FOOT_INDEX,
      ),

      spine: this.calculateAngleIfVisible(
        poseWithMidPoints,
        this.JOINTS.NOSE,
        midPointIndex + 1, // MID_HIP
        this.JOINTS.LEFT_HIP,
      ),

      shoulderWidth: this.calculateDistanceIfVisible(pose, this.JOINTS.LEFT_SHOULDER, this.JOINTS.RIGHT_SHOULDER),

      // 골반 너비 (왼쪽 힙과 오른쪽 힙 사이 거리)
      hipWidth: this.calculateDistanceIfVisible(pose, this.JOINTS.LEFT_HIP, this.JOINTS.RIGHT_HIP),
    };
  }

  /**
   * visibility를 고려한 각도 계산
   */
  private static calculateAngleIfVisible(
    pose: Landmark[],
    point1Index: number,
    point2Index: number,
    point3Index: number,
  ): number | null {
    // 세 점 모두 visibility가 충분한 경우에만 각도 계산
    if (!this.areJointsVisible(pose, [point1Index, point2Index, point3Index])) {
      return null;
    }

    const point1 = pose[point1Index];
    const point2 = pose[point2Index];
    const point3 = pose[point3Index];

    return this.calculateAngle(point1, point2, point3);
  }

  /**
   * 특정 관절 그룹의 visibility 체크
   */
  private static areJointsVisible(pose: Landmark[], joints: number[]): boolean {
    return joints.every((joint) => {
      // pose[joint]가 undefined인 경우를 먼저 체크
      if (!pose[joint]) {
        console.log(`Joint ${joint} is undefined`);
        return false;
      }

      // console.log("###", joint, pose[joint]);
      // visibility가 undefined인 경우 0으로 처리
      const visibility = pose[joint].visibility ?? 0;

      return visibility >= this.VISIBILITY_THRESHOLD;
    });
  }

  // visibility 체크를 포함한 거리 계산 함수
  private static calculateDistanceIfVisible(pose: Landmark[], point1Index: number, point2Index: number): number | null {
    // visibility 체크
    if (!this.areJointsVisible(pose, [point1Index, point2Index])) {
      return null;
    }

    return this.calculateDistance(pose, pose[point1Index], pose[point2Index]);
  }

  // 두 점 사이의 거리를 계산하는 함수
  private static calculateDistance(pose: Landmark[], point1: Landmark, point2: Landmark): number | null {
    if (!point1 || !point2) return null;

    try {
      const distance = Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) + Math.pow(point2.z - point1.z, 2),
      );

      return isNaN(distance) ? null : distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return null;
    }
  }

  /**
   * 세 점 사이의 각도 계산
   */
  private static calculateAngle(point1: Landmark, point2: Landmark, point3: Landmark): number {
    const vector1 = {
      x: point1.x - point2.x,
      y: point1.y - point2.y,
      z: point1.z - point2.z,
    };

    const vector2 = {
      x: point3.x - point2.x,
      y: point3.y - point2.y,
      z: point3.z - point2.z,
    };

    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y + vector1.z * vector1.z);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y + vector2.z * vector2.z);

    const angle = Math.acos(dotProduct / (magnitude1 * magnitude2));
    return (angle * 180) / Math.PI;
  }

  private static readonly MINIMUM_VALID_ANGLES = 3; // 최소한 필요한 유효한 각도 수

  // video 2개 자세 비교
  static isPoseMatchingVideo(
    pose1: Landmark[],
    // pose2: Landmark[]
    angles2: any,
  ):
    | {
        isMatching: boolean;
        matchingScore: number;
        details: {
          coordinateMatch: boolean;
          angleMatch: boolean;
          coordinateScore: number;
          angleScore: number;
          visibleJoints: number;
          totalJoints: number;
        };
      }
    | boolean {
    // 각도 계산 및 비교
    const angles1 = this.calculateJointAngles(pose1);
    // const angles2 = this.calculateJointAngles(pose2);

    console.log('각도계산 pose1: ', angles1);
    // console.log("각도계산 pose2: ", angles2);

    // visibility를 고려한 각도 비교
    let validAngleCount = 0;
    let matchingAngles = 0;

    Object.keys(angles1).forEach((key) => {
      const angle1 = angles1[key];
      const angle2 = angles2[key];

      // 두 자세 모두에서 해당 각도가 계산 가능한 경우에만 비교
      if (angle1 !== null && angle2 !== null) {
        validAngleCount++;
        if (Math.abs(angle1 - angle2) <= this.THRESHOLDS.ANGLE) {
          matchingAngles++;
        }
      }
    });

    // 최소한의 유효한 각도 수 체크
    if (validAngleCount < this.MINIMUM_VALID_ANGLES) {
      console.log(`Not enough valid angles. Found: ${validAngleCount}, Required: ${this.MINIMUM_VALID_ANGLES}`);

      return false;
    }

    const angleScore = validAngleCount > 0 ? matchingAngles / validAngleCount : 0;
    const angleMatch = angleScore >= this.THRESHOLDS.OVERALL;

    // 좌표 거리 계산 (visibility 고려)
    let totalDistance = 0;
    let visibleJointCount = 0;

    Object.values(this.JOINTS).forEach((jointIndex) => {
      // 두 자세 모두에서 해당 관절이 충분히 보이는 경우에만 비교
      if (
        pose1[jointIndex]?.visibility &&
        angles2[jointIndex]?.visibility &&
        pose1[jointIndex]?.visibility >= this.VISIBILITY_THRESHOLD &&
        angles2[jointIndex]?.visibility >= this.VISIBILITY_THRESHOLD
      ) {
        const distance = Math.sqrt(
          Math.pow(pose1[jointIndex].x - angles2[jointIndex].x, 2) +
            Math.pow(pose1[jointIndex].y - angles2[jointIndex].y, 2) +
            Math.pow(pose1[jointIndex].z - angles2[jointIndex].z, 2),
        );
        totalDistance += distance;
        visibleJointCount++;
      }
    });

    // 최소한의 visible 관절 수 체크
    if (visibleJointCount < this.MINIMUM_VALID_ANGLES) {
      console.log(`Not enough visible joints. Found: ${visibleJointCount}, Required: ${this.MINIMUM_VALID_ANGLES}`);
      return false;
    }

    const coordinateScore = visibleJointCount > 0 ? 1 - totalDistance / visibleJointCount : 0;
    const coordinateMatch = coordinateScore >= 1 - this.THRESHOLDS.COORDINATE;

    // 전체 점수 계산
    const matchingScore = (coordinateScore + angleScore) / 2;
    const isMatching = matchingScore >= this.THRESHOLDS.OVERALL;

    return {
      isMatching,
      matchingScore,
      details: {
        coordinateMatch,
        angleMatch,
        coordinateScore,
        angleScore,
        visibleJoints: visibleJointCount,
        totalJoints: Object.keys(this.JOINTS).length,
      },
    };
  }

  // 어드민 image 자세 추출
  static isPoseMatchingImage(pose: Landmark[]) {
    const angles = this.calculateJointAngles(pose);
    console.log('angles', angles);

    // 필수 각도 체크
    const essentialAngles = this.checkEssentialJoints(angles);
    console.log('essentialAngles', essentialAngles);

    if (essentialAngles !== true) {
      console.log(`필수 관절이 없습니다. ${JSON.stringify(essentialAngles)}`);
      return false;
    }

    return angles;
  }

  private static checkEssentialJoints(angles: any):
    | {
        [key: string]: boolean;
      }
    | boolean {
    const {
      leftElbow,
      rightElbow,
      leftShoulder,
      rightShoulder,
      leftKnee,
      rightKnee,
      leftHip,
      rightHip,
      leftAnkle,
      rightAnkle,
    } = angles;

    if (!leftElbow && !rightElbow) {
      return { elbow: false };
    }
    if (!leftShoulder && !rightShoulder) {
      return { shoulder: false };
    }
    // if (!leftHip && !rightHip) {
    //   return { hip: false };
    // }
    // if (!leftKnee && !rightKnee) {
    //   return { knee: false };
    // }
    // if (!leftAnkle && !rightAnkle) {
    //   return { ankle: false };
    // }

    return true;
  }
}
