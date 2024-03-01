const fetchMoneySpend = async (range: string) => {
  const mainSheetName = process.env
    .NEXT_PUBLIC_GOOGLE_MAIN_SHEET_NAME as string;

  const host = process.env.NEXT_PUBLIC_HOST as string;

  const response = await fetch(
    `${host}/api/sheets/${mainSheetName}?range=${range}`
  );

  const data = await response.json();
  return data.values[0][0];
};

export default async function MoneySpendBoard() {
  const [wannyMoneySpend, moominMoneySpend, totalMoneySpend] =
    await Promise.all([
      fetchMoneySpend("C24"),
      fetchMoneySpend("C25"),
      fetchMoneySpend("C26"),
    ]);

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center">
          <p>🐶 빵떡</p>
          <small>₩{wannyMoneySpend.toLocaleString()}</small>
        </div>
        <div className="flex flex-col items-center">
          <p>💵 합계</p>
          <small>₩{totalMoneySpend.toLocaleString()}</small>
        </div>
        <div className="flex flex-col items-center">
          <p>🐻‍❄️ 무민</p>
          <small>₩{moominMoneySpend.toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
}
