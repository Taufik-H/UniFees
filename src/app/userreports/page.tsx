import { api } from "@/trpc/server";
import CreateReport from "../_components/create-report";

const UserReports = async () => {
  const getReports = await api.userReport.getAll.query();

  return (
    <div>
      <h1>Report</h1>
      <div>
        {getReports.map((report) => (
          <div key={report.id}>
            <h2>{report.costPrizeFrom}</h2>
            <p>{report.costPrizeTo}</p>
          </div>
        ))}
      </div>
      <CreateReport />
    </div>
  );
};

export default UserReports;
