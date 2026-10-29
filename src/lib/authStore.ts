export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher-mentor' | 'recruiter' | 'hackathon-creator';
  institution?: string;
  roleSpecificId?: string;
  avatarUrl?: string;
  createdAt: string;
}

const STORAGE_KEY = 'elevate_hive_registered_users_v2';
const CURRENT_USER_KEY = 'elevate_hive_current_user_v2';

// Pre-seeded accounts for instant testing
export const INITIAL_DEMO_USERS: (UserProfile & { password: string })[] = [
  {
    id: 'demo-recruiter-1',
    name: 'Priya Mehta',
    email: 'recruiter@elevatehive.ai',
    password: 'recruiter123',
    role: 'recruiter',
    institution: 'Google Tech Sourcing',
    roleSpecificId: 'REC-GOOG-2026',
    createdAt: '2026-02-01'
  },
  {
    id: 'demo-teacher-1',
    name: 'Prof. Rajesh Kulkarni',
    email: 'teacher@elevatehive.ai',
    password: 'teacher123',
    role: 'teacher-mentor',
    institution: 'IIT Bombay Dept of CSE',
    roleSpecificId: 'FAC-CS-8812',
    createdAt: '2026-01-10'
  },
  {
    id: 'demo-creator-1',
    name: 'Vikram Singh',
    email: 'hackathon@elevatehive.ai',
    password: 'hackathon123',
    role: 'hackathon-creator',
    institution: 'E-Cell BITS Pilani',
    roleSpecificId: 'BITS-HACK-09',
    createdAt: '2026-02-05'
  },
  {
    id: 'demo-student-1',
    name: 'Aarav Sharma',
    email: 'student@elevatehive.ai',
    password: 'student123',
    role: 'student',
    institution: 'IIT Bombay',
    roleSpecificId: '21BCE1042',
    createdAt: '2026-01-15'
  }
];

export function getRegisteredUsers(): (UserProfile & { password: string })[] {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    // Legacy migration check if user previously had devverse stored
    if (!raw) {
      const oldRaw = localStorage.getItem('devverse_ai_registered_users');
      if (oldRaw) {
        raw = oldRaw;
        localStorage.setItem(STORAGE_KEY, oldRaw);
      }
    }
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_USERS;
  } catch (e) {
    return INITIAL_DEMO_USERS;
  }
}

export function registerUser(newUser: Omit<UserProfile, 'id' | 'createdAt'> & { password: string }): { success: boolean; message: string; user?: UserProfile } {
  const users = getRegisteredUsers();
  
  // Check existing
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existingIdx >= 0) {
    // Update existing user with new details
    const updatedUser = {
      ...users[existingIdx],
      ...newUser,
    };
    users[existingIdx] = updatedUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    const { password, ...safeUser } = updatedUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    return { success: true, message: 'Account updated and logged in successfully!', user: safeUser };
  }

  const createdUser: UserProfile & { password: string } = {
    ...newUser,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(createdUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  // Auto login
  const { password, ...safeUser } = createdUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return { success: true, message: 'Account created successfully!', user: safeUser };
}

export function loginUser(
  email: string, 
  password: string, 
  extraDetails?: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
): { success: boolean; message: string; user?: UserProfile } {
  const users = getRegisteredUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const altEmail = normalizedEmail.includes('@elevatehive.ai')
    ? normalizedEmail.replace('@elevatehive.ai', '@devverse.ai')
    : normalizedEmail.replace('@devverse.ai', '@elevatehive.ai');

  const idx = users.findIndex(u => {
    const uEmail = u.email.toLowerCase();
    return uEmail === normalizedEmail || uEmail === altEmail;
  });

  if (idx < 0) {
    // If user enters details during sign in that doesn't exist yet, auto register with details
    const createdUser: UserProfile & { password: string } = {
      id: `user-${Date.now()}`,
      name: extraDetails?.name || (email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : 'Elevate Hive User'),
      email: email,
      password: password || 'password123',
      role: extraDetails?.role || 'student',
      institution: extraDetails?.institution || 'IIT Bombay',
      roleSpecificId: extraDetails?.roleSpecificId || '21BCE1042',
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(createdUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    const { password: _, ...safeUser } = createdUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return { success: true, message: 'Signed in successfully!', user: safeUser };
  }

  const found = users[idx];

  // Accept valid password or fallback password123 / demo passwords
  if (found.password !== password && password !== 'password123' && password !== `${found.role}123`) {
    return { success: false, message: 'Incorrect password. Please verify or use your role password (e.g. student123).' };
  }

  // Update with any provided extra details (role, institution, name, roleSpecificId)
  const updatedUser: UserProfile & { password: string } = {
    ...found,
    name: extraDetails?.name?.trim() ? extraDetails.name : found.name,
    role: extraDetails?.role || found.role,
    institution: extraDetails?.institution?.trim() ? extraDetails.institution : found.institution,
    roleSpecificId: extraDetails?.roleSpecificId?.trim() ? extraDetails.roleSpecificId : found.roleSpecificId,
  };

  users[idx] = updatedUser;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  const { password: _, ...safeUser } = updatedUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return { success: true, message: 'Logged in successfully!', user: safeUser };
}

export function getCurrentUser(): UserProfile | null {
  try {
    let raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      const oldRaw = localStorage.getItem('devverse_ai_current_user');
      if (oldRaw) {
        raw = oldRaw;
        localStorage.setItem(CURRENT_USER_KEY, oldRaw);
      }
    }
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user: UserProfile | null) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
