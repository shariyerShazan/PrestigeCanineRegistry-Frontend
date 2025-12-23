export interface Permission {
  category: string;
  actions: ("view" | "create" | "edit")[];
  extra?: number;
}

export interface Role {
  id: string;
  name: string;
  roleType: string;
  email: string;
  password: string; // Masked in table
  lastLogin: string;
  permissions: Permission[];
}