import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@moomin-money/libs/auth';
import { getSheetValues } from '@moomin-money/services/apis/get-sheets';

const checkSession = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions);
  return Boolean(session);
};

const fetchMoneySpend = async (range: string): Promise<string> => {
  const sheetName = process.env.NEXT_PUBLIC_GOOGLE_MAIN_SHEET_NAME;

  if (!sheetName) {
    throw new Error('NEXT_PUBLIC_GOOGLE_MAIN_SHEET_NAME is not set');
  }

  try {
    return await getSheetValues({ sheetName, range }).then(values => `${values[0][0].toLocaleString()}원`);
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to fetch money spend', error);
    throw new Error(error as string);
  }
};

export default async function MoneySpendBoard(): Promise<React.ReactElement> {
  const spendCodes = ['C24', 'C26', 'C25'];
  const labels = ['🐶 빵떡', '💵 합계', '🐻‍❄️ 무민'];

  if (!(await checkSession())) {
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
          <p>지속적으로 발생할 경우 관리자에게 문의해주세요</p>
        </div>
      </div>
    );
  }
}
