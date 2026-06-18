// Utility helpers for generating unique test data
export function genEmail(prefix = 'user', domain = 'idsinternal.com') {
  return `${prefix}${Date.now()}@${domain}`;
}

export function genInviteEmail(prefix = 'invite', domain = 'idsinternal.com') {
  return `${prefix}${Date.now()}@${domain}`;
}

export function genCompanyName() {
  return `IDS-Internal${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export function genCompanyCode() {
  return `IDS-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
}

export function genMobileNumber(countryDial = '+91') {
  return `${countryDial}${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

export function genTag(prefix = 'IDS_Internal') {
  return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
}
