export interface BackendPermission {
  resource:
    | "USER"
    | "CANINE"
    | "CERTIFICATE"
    | "REPORT"
    | "TRANSFER_OWNERSHIP"
    | "MEMBERSHIP_PLAN";
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  roleType: string;
  permissions: BackendPermission[];
}
