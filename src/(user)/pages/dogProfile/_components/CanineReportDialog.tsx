/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { useSubmitReportMutation } from "@/redux/features/report/report.api";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useSubmitReportMutation } from "@/redux/features/report-api/report.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  canineId?: string;
  litterId?: string;
  targetName: string;
}

export default function CanineReportDialog({
  isOpen,
  onClose,
  canineId,
  litterId,
  targetName,
}: Props) {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const [submitReport, { isLoading }] = useSubmitReportMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const res = await submitReport({
        subject,
        reason,
        description,
        canineId,
        litterId,
        // Backend-e proyojon hole ekhane extra details add korte paren
        reporterName: "Current User", // Replace with actual user name from auth state
        reporterEmail: "user@example.com", // Replace with actual email
      }).unwrap();

      toast.success((res as any).message || "Report submitted successfully.");
      onClose();
      // Reset form
      setSubject("");
      setReason("");
      setDescription("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit report");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {targetName}</DialogTitle>
          <DialogDescription>
            Please provide details about the issue you encountered.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Incorrect DNA Info"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              placeholder="e.g., Fraudulent Activity"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
