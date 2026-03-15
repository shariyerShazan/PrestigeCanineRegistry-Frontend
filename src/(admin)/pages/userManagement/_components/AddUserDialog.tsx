/* eslint-disable @typescript-eslint/no-explicit-any */
// UserDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiMapPin,
  // FiPhone,
  FiLock,
  FiBriefcase,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useCreateUserByAdminMutation,
  useUpdateUserMutation,
} from "@/redux/features/admin-user/admin.user.api";

interface AddUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: any;
}

const UserDialog = ({ open, setOpen, editData }: AddUserDialogProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isEditMode = !!editData;

  const { register, handleSubmit, reset, setValue } = useForm();
  const [createUser, { isLoading: isCreating }] =
    useCreateUserByAdminMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (open) {
      reset(
        isEditMode
          ? {
              fullName: editData.fullName || "",
              email: editData.email || "",
              city: editData.city || "",
              state: editData.state || "",
              zipCode: editData.zipCode || "",
              country: editData.country || "",
              phoneNumber: editData.phoneNumber || "",
              roleType: editData.roleType || "OWNER",
            }
          : {
              roleType: "OWNER",
            },
      );
    }
  }, [editData, reset, open, isEditMode]);

  const onSubmit = async (data: any) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ]),
      );

      if (isEditMode) {
        await updateUser({ id: editData.id, ...payload }).unwrap();
      } else {
        await createUser(payload).unwrap();
      }

      toast.success(
        isEditMode ? "User updated successfully" : "User created successfully",
      );
      setOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiUserPlus size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <FiUserPlus className="text-[#D4AF37]" />
              {isEditMode ? "Edit User Profile" : "Create New User"}
            </DialogTitle>
            <DialogDescription className="text-blue-100/70">
              {isEditMode
                ? "Modify account details and access levels."
                : "Manually register a new account to the system."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white overflow-y-auto max-h-[70vh]"
        >
          <div className="space-y-6">
            {/* Identity Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                <FiBriefcase /> Primary Identity
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Full Name" id="fullName">
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="e.g. John Doe"
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
                <FormGroup label="Email Address" id="email">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="name@email.com"
                    disabled={isEditMode}
                    className="h-11 bg-slate-50/50 disabled:bg-slate-100"
                  />
                </FormGroup>
                <FormGroup label="User Role">
                  <Select
                    defaultValue={editData?.roleType || "OWNER"}
                    onValueChange={(val) => setValue("roleType", val)}
                  >
                    <SelectTrigger className="h-11 bg-slate-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OWNER">Owner</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormGroup>
                <FormGroup label="Phone Number" id="phoneNumber">
                  <Input
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    placeholder="+1..."
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                <FiMapPin /> Location Details
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Country">
                  <Input
                    {...register("country")}
                    placeholder="United States"
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
                <FormGroup label="State / Province">
                  <Input
                    {...register("state")}
                    placeholder="New York"
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
                <FormGroup label="City">
                  <Input
                    {...register("city")}
                    placeholder="Manhattan"
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
                <FormGroup label="Zip Code">
                  <Input
                    {...register("zipCode")}
                    placeholder="10001"
                    className="h-11 bg-slate-50/50"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Security Section (Create Only) */}
            {!isEditMode && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                  <FiLock /> Security
                </div>
                <div className="relative">
                  <Label className="text-slate-600 font-medium ml-1 mb-1.5 block">
                    Login Password
                  </Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Leave empty for auto-generated"
                    className="h-11 bg-slate-50/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-slate-400 hover:text-[#2B4C8A]"
                  >
                    {showPassword ? (
                      <FiEye size={18} />
                    ) : (
                      <FiEyeOff size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-8 gap-3 border-t pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-slate-500 font-semibold h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#2B4C8A] hover:bg-[#1a3563] text-white px-8 h-11 font-bold shadow-lg shadow-blue-900/20 flex-1 sm:flex-none"
            >
              {isLoading
                ? "Processing..."
                : isEditMode
                  ? "Update Profile"
                  : "Register User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-1.5">
    <Label className="text-slate-600 font-medium ml-1">{label}</Label>
    {children}
  </div>
);

export default UserDialog;
