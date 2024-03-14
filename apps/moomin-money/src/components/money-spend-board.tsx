import { headers } from 'next/headers';
import { getSheetValues } from '@moomin-money/services/apis/get-sheets';

const fetchMoneySpend = async (range: string): Promise<number> => {
  const sheetName = process.env.NEXT_PUBLIC_GOOGLE_MAIN_SHEET_NAME;
  const host = headers().get('x-forwarded-host');
  if (!host) {
    throw new Error('x-forwarded-host header is not set');
  }
  const protocol = headers().get('x-forwarded-proto');
  if (!protocol) {
    throw new Error('x-forwarded-proto header is not set');
  }

  if (!sheetName) {
    throw new Error('NEXT_PUBLIC_GOOGLE_MAIN_SHEET_NAME is not set');
  }

  try {
    return await getSheetValues({ protocol, host, sheetName, range }).then(values => values[0][0]);
  } catch (error) {
    throw new Error(error as string);
  }
};

export default async function MoneySpendBoard(): Promise<React.ReactElement> {
  const fetchAllMoneySpend = async (): Promise<{ label: string; amount: string }[]> => {
    const spendCodes = ['C24', 'C26', 'C25'];
    const labels = ['🐶 빵떡', '💵 합계', '🐻‍❄️ 무민'];

    return Promise.all(spendCodes.map(fetchMoneySpend)).then(spends =>
      spends.map((spend, index) => ({
        label: labels[index],
        amount: `${spend.toLocaleString()}원`,
      }))
    );
  };

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
}
