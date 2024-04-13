import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Családtag</TableHead>
          <TableHead>Nettó bér</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people ? people.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium"><Button variant="link" onClick={() => { setActiveTab(row.id) }} >{row["name"]}</Button></TableCell>
            <TableCell>{row["NBer"]}</TableCell>
          </TableRow>
        )) : "No data available."
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell >Összesen</TableCell>
          <TableCell>{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default HouseholdSummary;