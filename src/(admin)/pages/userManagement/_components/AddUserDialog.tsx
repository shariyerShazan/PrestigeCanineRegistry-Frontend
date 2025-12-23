
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  FiUserPlus } from "react-icons/fi";
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const AddUserDialog = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E17100] hover:bg-[#c96500] text-white gap-2 h-10 px-4 rounded-lg cursor-pointer">
          <FiUserPlus className="size-5" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the details of the new user below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" placeholder="Michael Chen" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" placeholder="mchen@email.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input id="location" placeholder="San Diego, CA" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <Label htmlFor="password" className="text-right">Password</Label>
            <div className="col-span-3 relative">
              <Input id="password" type={!showPassword ? 'text' : 'password'} placeholder="Enter password" />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-[#2B4C8A] cursor-pointer">Save User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;