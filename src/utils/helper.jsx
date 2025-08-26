// Helper functions used throughout the application

// Format date to readable string
export function formatDate(date) {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-NG', options);
}

// Truncate text with ellipsis
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Generate avatar from name (for users without profile pics)
export function generateAvatarUrl(name) {
  if (!name) return 'https://ui-avatars.com/api/?background=random';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
}

// Format file size for display
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Validate file type against allowed types
export function validateFileType(file, allowedTypes) {
  if (!file || !allowedTypes) return false;
  return allowedTypes.includes(file.type);
}

// Extract filename from path
export function getFileNameFromPath(path) {
  if (!path) return '';
  return path.split('/').pop();
}

// Generate a readable project ID
export const generateProjectId = (department,prefix = 'PPR') => {
  const cleanDept = department.toLowerCase().replace(/\s+/g, "-");
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(6, '0');
  return `${cleanDept}-${timestamp}-${prefix}-${random}`;
};

// Check if object is empty
export function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

// Check if user has a specific permission
export function hasPermission(userRole, permissionRoles) {
  if (!userRole || !permissionRoles) return false;
  
  if (Array.isArray(permissionRoles)) {
    return permissionRoles.includes(userRole);
  }
  
  return userRole === permissionRoles;
}

// Format role for display
export function formatRole(role) {
  if (!role) return '';
  return role.charAt(0).toUpperCase() + role.slice(1);
}

// Get project status badge color
export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
}