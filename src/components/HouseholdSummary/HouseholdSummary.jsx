
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";



const HouseholdSummary = ({ people, setActiveTab }) => {
  if (!people) return null;
  const [totalAmount, setTotalAmount] = useState(0);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    const total = people.reduce((sum, person) => sum + person.NBer, 0);
    setTotalAmount(total);
  }, [people]);


  return (
    <div className=" bg-slate-300 rounded-xl p-6 m-0 flex items-center flex-col">
      <h2 className="text-2xl font-bold mt-20 mb-6">Háztartás összesített jövedelme</h2>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-2 border-slate-300 bg-slate-100 p-0 even:bg-muted">
              <th className="border-2 border-slate-300 bg-slate-100 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Családtag
              </th>
              <th className="border-2 border-slate-300 bg-slate-100   px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Nettó bér
              </th>
            </tr>
          </thead>
          <tbody>
            {people ? people.map((row) => (
              <tr key={row.id} className="m-0 border-t p-0 even:bg-muted">
                <td className="border-2 border-slate-300 bg-slate-100 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <Button className=" text-md" variant="link" onClick={() => { setActiveTab(row.id) }} >{row["name"]}</Button>
                </td>
                <td className="border-2 border-slate-300 bg-slate-100 px-4 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  {Math.floor(row["NBer"])} Ft
                </td>
              </tr>
            )) : "No data available."}
            <tr className="m-0 border-t p-0">
              <td className="border-2 border-slate-300 bg-slate-100 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Összesen:
              </td>
              <td className="border-2 border-slate-300 bg-slate-100 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {Math.floor(totalAmount)} Ft
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HouseholdSummary;