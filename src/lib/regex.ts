export const regex: Record<string, RegExp> = {
  phone: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
};
