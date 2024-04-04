const SalaryCalculator = ({ person, activeTab }) => {
  const tabId = activeTab;
  return <div className="bg-yellow-500">{tabId}{person}</div>;
};

export default SalaryCalculator;
