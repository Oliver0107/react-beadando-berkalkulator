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

const DatePickerModal = ({gDate}) => {
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
        <Button variant="outline" className="h-3 w-40">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <DatePicker dChange={dateChange}/>
           
          </div>
        </div>
        <DialogFooter>
            <DialogClose>
            <Button type="submit" onClick={()=>{getDate()}}>Mentés</Button>
            </DialogClose>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DatePickerModal;
