export const is_bangladesh_mobile = (value?: string): boolean => {
  const bangladeshMobileRegex = /^(\+8801|8801|01)[3-9]\d{8}$/;
  if (value && bangladeshMobileRegex.test(value)) {
    return true;
  }
  return false;
};
