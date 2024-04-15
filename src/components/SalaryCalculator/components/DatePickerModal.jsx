import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { DatePicker } from "./DatePicker"
import { DialogClose } from "@radix-ui/react-dialog"

const DatePickerModal = ({ gDate }) => {
  const [date, setDate] = useState(new Date());
  const dateChange = (e) => {
    setDate(e);

  }

  const getDate = () => {
    gDate(date);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-3 w-40 font-semibold text-white">Dátum módosítása</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            A kedvezmény először a házasságkötést követő hónapban vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col">
            <Label className=" font-semibold mb-2">
              Add meg a házasságkötés dátumát:
            </Label>
            <DatePicker dChange={dateChange} />
            <Label className="mt-2 text-muted-foreground">
              Például: 2000/10/25
            </Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose >
            <Button type="submit" onClick={() => { getDate() }}>Mentés</Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DatePickerModal;
