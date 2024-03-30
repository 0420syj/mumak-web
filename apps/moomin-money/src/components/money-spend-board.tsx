import Link from 'next/link';
import { Skeleton } from '@repo/ui/skeleton';
import { isSessionValid } from '@moomin-money/libs/auth';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';

export function MoneySpendBoardSkeleton(): React.ReactElement {
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
    </div>
  );
}

const fetchMoneySpend = async (range: string): Promise<string> => {
  const googleSheetsService = new GoogleSheetsService();
  const sheetName = process.env.GOOGLE_MAIN_SHEET_NAME;

  if (!sheetName) {
    throw new Error('GOOGLE_MAIN_SHEET_NAME is not set');
  }

  try {
    return await googleSheetsService
      .getSheetValues(`${sheetName}!${range}`)
      .then(values => `${values[0][0].toLocaleString()}원`);
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to fetch money spend', error);
    throw new Error(error as string);
  }
};

export default async function MoneySpendBoard(): Promise<React.ReactElement> {
  const spendCodes = ['C24', 'C26', 'C25'];
  const labels = ['🐶 빵떡', '💵 합계', '🐻‍❄️ 무민'];

  if (!(await isSessionValid())) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-around">
          {labels.map(label => (
            <div className="flex flex-col items-center gap-1" key={label}>
              <p className="text-lg font-semibold">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/api/auth/signin">로그인이 필요합니다.</Link>
        </div>
      </div>
    );
  }

  const fetchAllMoneySpend = async (): Promise<{ label: string; amount: string }[]> => {
    return Promise.all(spendCodes.map(fetchMoneySpend)).then(spends =>
      spends.map((spend, index) => ({
        label: labels[index],
        amount: spend,
      }))
    );
  };

  try {
    const [moneySpends] = await Promise.all([fetchAllMoneySpend()]);

    return (
      <div className="flex flex-row justify-around">
        {moneySpends.map(({ label, amount }) => (
          <div className="flex flex-col items-center gap-1" key={label}>
            <p className="text-lg font-semibold">{label}</p>
            <p>{amount}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to fetch money spend', error);
    return (
      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-semibold">🚧 오류가 발생했습니다</p>
          <p>다시 시도해주세요</p>
        </div>
      </div>
    );
  }
}
