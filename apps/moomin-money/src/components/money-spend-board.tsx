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
  const fetchAllMoneySpend = async () => {
    const spendCodes = ["C24", "C25", "C26"];
    const labels = ["🐶 빵떡", "💵 합계", "🐻‍❄️ 무민"];

    return Promise.all(spendCodes.map(fetchMoneySpend)).then((spends) =>
      spends.map((spend, index) => ({
        label: labels[index],
        amount: spend.toLocaleString(),
      }))
    );
  };

  const [moneySpends] = await Promise.all([fetchAllMoneySpend()]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-around">
        {moneySpends.map(({ label, amount }) => (
          <div className="flex flex-col items-center" key={label}>
            <p>{label}</p>
            <p>₩{amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
