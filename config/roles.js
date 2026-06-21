// Определение ролей и их прав доступа
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EXECUTOR: 'executor',
  CLIENT: 'client',
};

export const ROLE_PERMISSIONS = {
  admin: {
    label: 'Администратор',
    color: '#ef4444',
    permissions: [
      'view_users',
      'edit_users',
      'delete_users',
      'view_all_projects',
      'edit_all_projects',
      'delete_projects',
      'view_reports',
      'manage_system',
      'manage_roles',
      'view_finance',
      'view_dashboard',
    ],
  },
  manager: {
    label: 'Менеджер',
    color: '#f59e0b',
    permissions: [
      'view_users',
      'view_projects',
      'create_projects',
      'edit_own_projects',
      'assign_tasks',
      'view_reports',
      'view_finance',
      'view_dashboard',
    ],
  },
  executor: {
    label: 'Исполнитель',
    color: '#10b981',
    permissions: [
      'view_own_projects',
      'view_tasks',
      'edit_own_tasks',
      'view_profile',
      'upload_portfolio',
    ],
  },
  client: {
    label: 'Заказчик',
    color: '#3b82f6',
    permissions: [
      'view_own_projects',
      'create_request',
      'view_profile',
      'leave_reviews',
    ],
  },
};

export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole]?.permissions || [];
  return permissions.includes(permission);
};

export const canAccessPage = (userRole, requiredRoles) => {
  return requiredRoles.includes(userRole);
};