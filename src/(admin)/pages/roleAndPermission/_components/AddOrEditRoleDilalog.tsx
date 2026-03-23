/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSyncPermissionsMutation,
  useGetAllAdminsQuery,
} from "@/redux/features/admin-permission/admin.permission";
import { Plus, Trash2 } from "lucide-react";
import { LuShieldPlus, LuShieldCheck } from "react-icons/lu";
import { toast } from "react-toastify";

const RESOURCE_TYPES = [
  "USER",
  "CANINE",
  "CERTIFICATE",
  "REPORT",
  "TRANSFER_OWNERSHIP",
  // "MEMBERSHIP_PLAN",
];

const ACTIONS = [
  { id: "canView", label: "View" },
  { id: "canCreate", label: "Create" },
  { id: "canEdit", label: "Edit" },
  { id: "canDelete", label: "Delete" },
];

const AddNewRoleDialog = ({ isOpen, onClose, initialData }: any) => {
  const { data: admins } = useGetAllAdminsQuery();
  const [syncPermissions, { isLoading }] = useSyncPermissionsMutation();

  const [selectedAdminId, setSelectedAdminId] = useState<string>("");
  const [permissions, setPermissions] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setSelectedAdminId(initialData.id);
        setPermissions(initialData.permissions || []);
      } else {
        setSelectedAdminId("");
        // Default-e ekta empty resource row open thakbe
        setPermissions([
          {
            resource: "",
            canView: false,
            canCreate: false,
            canEdit: false,
            canDelete: false,
          },
        ]);
      }
    }
  }, [initialData, isOpen]);

  const addResourceRow = () => {
    if (permissions.length >= RESOURCE_TYPES.length) return;
    setPermissions([
      ...permissions,
      {
        resource: "",
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
      },
    ]);
  };

  const removeResourceRow = (index: number) => {
    setPermissions(permissions.filter((_, i) => i !== index));
  };

  const updatePermission = (index: number, field: string, value: any) => {
    const updated = [...permissions];
    updated[index] = { ...updated[index], [field]: value };
    setPermissions(updated);
  };

  const handleSave = async () => {
    if (!selectedAdminId) return toast.error("Please select an admin");

    // Resource select kora chara save hote dibe na
    if (permissions.some((p) => !p.resource)) {
      return toast.error("Please select resource types for all rows");
    }

    try {
      await syncPermissions({
        adminId: selectedAdminId,
        body: permissions,
      }).unwrap();
      toast.success("Permissions updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl rounded-xl">
        {/* Header Design matching UserDialog */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LuShieldPlus size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <LuShieldCheck className="text-[#D4AF37]" />
              {initialData ? "Edit Admin Access" : "Assign System Permissions"}
            </DialogTitle>
            <DialogDescription className="text-blue-100/70">
              {initialData
                ? `Managing access control for ${initialData.fullName}`
                : "Configure granular resource permissions for system administrators."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Admin Selection */}
          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-xs uppercase tracking-widest">
              Target Administrator
            </Label>
            <Select
              disabled={!!initialData}
              value={selectedAdminId}
              onValueChange={setSelectedAdminId}
            >
              <SelectTrigger className="h-12 border-slate-200 bg-slate-50/50 cursor-pointer">
                <SelectValue placeholder="Choose an admin profile" />
              </SelectTrigger>
              <SelectContent>
                {admins?.map((admin: any) => (
                  <SelectItem key={admin.id} value={admin.id}>
                    {admin.fullName} ({admin.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <Label className="text-[#2B4C8A] font-bold text-xs uppercase tracking-widest">
                Resource Permissions
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addResourceRow}
                className="text-[#155DFC] hover:bg-blue-50 font-bold text-xs cursor-pointer"
              >
                <Plus className="size-4 mr-1" /> Add Another
              </Button>
            </div>

            {permissions.map((p, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-slate-100 bg-slate-50/30 space-y-4 relative group animate-in fade-in duration-300"
              >
                <div className="grid grid-cols-1 gap-4">
                  {/* Resource Select */}
                  <div className="space-y-2">
                    <Select
                      value={p.resource}
                      onValueChange={(val) =>
                        updatePermission(index, "resource", val)
                      }
                    >
                      <SelectTrigger className="bg-white border-slate-200 h-10 cursor-pointer">
                        <SelectValue placeholder="Select Resource Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOURCE_TYPES.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            disabled={permissions.some(
                              (existing, i) =>
                                existing.resource === type && i !== index,
                            )}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions (Multiple Selection) */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 px-1">
                    {ACTIONS.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`action-${index}-${action.id}`}
                          checked={!!p[action.id]}
                          onCheckedChange={(checked) =>
                            updatePermission(index, action.id, !!checked)
                          }
                          className="data-[state=checked]:bg-[#2B4C8A] border-slate-300 cursor-pointer"
                        />
                        <label
                          htmlFor={`action-${index}-${action.id}`}
                          className="text-sm font-semibold text-slate-600 cursor-pointer select-none"
                        >
                          {action.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {permissions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeResourceRow(index)}
                    className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-slate-50/50 gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-slate-500 font-semibold h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !selectedAdminId}
            className="bg-[#2B4C8A] hover:bg-[#1a3563] text-white px-8 h-11 font-bold shadow-lg shadow-blue-900/20 flex-1 sm:flex-none"
          >
            {isLoading ? "Synchronizing..." : "Update Access Control"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRoleDialog;
