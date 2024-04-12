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
import { set } from "date-fns";
import { useEffect,useState } from "react";



const HouseholdSummary = ({people}) => {
  if (!people) return null;
  const [totalAmount, setTotalAmount] = useState(0);
  const [rows, setRows] = useState([]);


  
    people.forEach(person => {
      setRows([...rows, {id: person.id, name: person.name, nber: person.NBer}]);
      
      setTotalAmount(totalAmount + person.NBer);
    })
  

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows ? rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row["name"]}</TableCell>
            <TableCell>{row["id"]}</TableCell>
            <TableCell>{row["nber"]}</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        )) : "No data available."
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default HouseholdSummary;