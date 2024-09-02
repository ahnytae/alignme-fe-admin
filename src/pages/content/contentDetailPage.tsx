import { Button } from '@/components/ui/button';
import { BackButton } from './components/backButton';

const DashboardContentDetailPage: React.FC = () => {
  // dummy data
  const stats = [
    { id: 1, name: '난이도', value: '쉬움' },
    { id: 2, name: '등록일자', value: '2024.03.02' },
    { id: 3, name: '운동횟수', value: '1회' },
  ];
  return (
    <div className="relative mx-5 min-h-screen max-w-[630px] sm:mx-auto">
      <BackButton />
      <img
        alt="운동 사진"
        src="https://s3-alpha-sig.figma.com/img/ec08/69a5/a0cbfee1880c25b92a10d3300a9eee5b?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qDCoBSy5QDeYGiHxCDox806fF35FmRUOnx1XuqIXC0WJ~Ap3Kh4vnAtnbmT4S4hXIdIpjq2IAZMR-K6lZNlcpfIYwq1jhJONTKcDwKGsfPaJh0DCKsBDOyXDmTVv-QZ45AIh7EDu3c8en0JX8tHHPHoCe8tSYMiY-nbX1WKdjWWPnS6J6CSQpbUH0qmJBfpf4q6n4TRMBfg9th2fxvUIlX4~EXadBd2JdwkT1ypSW032YF61PDQKiV4knhxTiDM5hrUkXIK1rbABEkUlEorXS53kBSxwjEwLQB3nUcx0hKdxbsXw4OJ4quWGZGs3vdl4-0TiKo-4517YelVSppJ~mw__"
        className="h-[264px] w-full rounded-b-xl object-cover"
      />
      <div className="flex flex-col gap-6 py-5">
        <div className="text-heading-small text-content-primary">운동이름 운동이름 운동이름</div>

        <dl className="grid grid-cols-3 overflow-hidden rounded-lg bg-background-secondary text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col rounded-lg p-4">
              <dt className="text-paragraph-tiny text-content-tertiary">{stat.name}</dt>
              <dd className="text-label-base text-content-secondary">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mb-10 flex flex-col gap-2">
          <div className="text-label-large text-content-primary">설명</div>
          <div className="h-[300px] overflow-y-auto text-paragraph-base text-content-secondary ">
            계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 아무 걱정도 없이 가을 속의 별들을 다 헬 듯합니다. 별
            하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니,
            어머님, 나는 별 하나에 아름다운 말 한 마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경,
            옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기,
            강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 가슴 속에 하나 둘
            새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이
            다하지 않은 까닭입니다.계절이 지나가는 하늘에는 가을로 가득 차 있습니다.
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 mt-4 flex w-full flex-col justify-end gap-2">
        <Button variant="secondary" size="area" onClick={() => console.log('수정')}>
          수정하기
        </Button>
        <Button
          variant="custom"
          size="area"
          className="border border-border-primary bg-background-primary text-system-error"
          onClick={() => console.log('삭제')}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
};
export default DashboardContentDetailPage;
