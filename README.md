## AI운동자세 관리자 대시보드 (Alignme) - Frontend

---

### 소개

Pose Detection API 와 자체 개발한 두 자세간 유사성 비교 모듈을 활용하여 사용자의 운동 자세가 강사의 모범 운동자세와 같은지 피드백을 제공합니다.

(레슨장 대표강사와 일반 강사 만 사용 가능한 관리자 대시보드 서비스 입니다)

<div float="left">
<img width="350" alt="Image" src="https://github.com/user-attachments/assets/f0745dde-5918-42d2-bb08-6f68d115f7bd" />
<img width="400" alt="Image" src="https://github.com/user-attachments/assets/35ddfb65-f740-4270-a24b-ef1c45b844c0" />
</div>
<div float="left">
<img width="400" alt="Image" src="https://github.com/user-attachments/assets/e4af4f3a-c9c3-49bb-b4ba-eee9bc171cfd" />
<img width="400" alt="Image" src="https://github.com/user-attachments/assets/90e769ff-9a66-4f7a-af73-2b96479283f5" />
</div>
<div float="left">
<img width="400" alt="Image" src="https://github.com/user-attachments/assets/a53138eb-6b5b-4848-86c8-edae6568d3dd" />
<img width="400" alt="Image" src="https://github.com/user-attachments/assets/c288b264-6026-4797-9fa6-87f5273cb9c3" />
</div>



---

### 서비스 구조

![Image](https://github.com/user-attachments/assets/0122178b-7c2d-4197-8d54-a2d8187148d2)

- Alignme Core API는 Private NPM에 배포 되어 각 프론트엔드에 API 형태로 연동 중.
- Alignme Core API는 Pose Detaection API를 사용하여 데이터 추출 후 자체 알고리즘으로 자세 유사성 비교.

---

### 인프라

- ### Frontend

  - **Hosting**: AWS S3
  - **Framework**: React.js
  - **Distribution**: CloudFront CDN

  ### Backend

  - **Hosting**: AWS EC2
  - **Framework**: Nest.js

  ### Database

  - **Service**: AWS RDS
  - **Type**: PostgreSQL, TypeORM
  - **Tool**: DBeaver

  ### Network & Security

  - **DNS Management**: Route 53
  - **Domain Management**: Route 53
  - **SSL Certificate**: AWS Certificate Manager

---

### 기능

- JWT / 카카오 Oauth
- 레슨장 대표강사가 수강생/강사 회원 가입승인/거절/내보내기
- 운동 컨텐츠 CRUD
- 자세분석 Core 모듈과 연동으로 운동컨텐츠 생성시 유효한 자세 이미지인지 확인 후 등록 / 등록실패



