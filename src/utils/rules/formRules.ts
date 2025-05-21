import { Rule } from "antd/es/form";

export const rule_required = (message?: string): Rule => {
  return {
    required: true,
    message: message || "This field is required!",
  };
};

export const rule_url = (message?: string): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve(); // Allow empty field
      try {
        new URL(value); // This will throw if the value is not a valid URL
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(
          new Error(message || "Please enter a valid URL!")
        );
      }
    },
  });
};

export const rule_disableWithValueCheck = (
  checker: string,
  message?: string
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve();
      if (value != checker) {
        return Promise.reject(new Error(message || "You can't change it!"));
      }
      return Promise.resolve();
    },
  });
};

export const rule_checkValueIsNotIncludesArr = (
  checker: string[],
  message?: string
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve();
      if (checker?.length && checker.includes(value)) {
        return Promise.reject(
          new Error(message || "Please enter a valid value!")
        );
      }
      return Promise.resolve();
    },
  });
};

export const rule_numeric = (message?: string): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve();
      if (value && /^\d*$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(message || "Only Numeric values are allowed"!)
      );
    },
  });
};

export const rule_email = (message?: string): Rule => {
  return {
    type: "email",
    message: message || "Please enter a valid email!",
  };
};

export const rule_confirmPassword = (
  formFieldName: string,
  message?: string
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue(formFieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message || "Password not matched!"));
    },
  });
};

export const rule_confirmPassword_unique_by_old_one = (
  formFieldName: string,
  oldPassFieldName: string,
  message?: string
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue(formFieldName) !== getFieldValue(oldPassFieldName)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message || "Use new password!"));
    },
  });
};

export const rule_bangladesh_mobile = (message?: string): Rule => {
  return {
    validator(_, value) {
      const bangladeshMobileRegex = /^(\+8801|8801|01)[3-9]\d{8}$/;
      if (!value || bangladeshMobileRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(message || "Please enter a valid Bangladeshi mobile number!")
      );
    },
  };
};
