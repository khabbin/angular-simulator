enum SubscriptionPlan {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

interface IPremiumUser extends IUser {
  subscriptionPlan: SubscriptionPlan;
  premiumSince: Date;
}

interface IUser {
  id: number;
  password: number | string;
  name: string;
  age?: number;
}

const kirill: IPremiumUser = {
  id: 1,
  name: 'kirill',
  password: 123,
  subscriptionPlan: SubscriptionPlan.Monthly,
  premiumSince: new Date()
}

export const users: IUser[] = [
  kirill,
  {
    id: 2,
    password: 123,
    name: 'хайтаб'
  },
  {
    id: 3,
    password: 444,
    name: 'killer67'
  },
  {
    id: 4,
    password: 12345,
    name: 'артем'
  },
  {
    id: 5,
    password: 222222222,
    name: 'лоутаб'
  }
];

export const filteredUsers = users.filter(user => user.id > 2)

const getSum = (a: number, b: number): number => {
  return a + b;
}

export const transformText = (string: string, textCase: TextFormat): string => {
  switch(textCase) {
    case TextFormat.UpperCase:
      return string.toUpperCase();
    case TextFormat.LowerCase:
      return string.toLowerCase();
    case TextFormat.Capitalize:
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    default:
      return string;
  }
}

export const deleteSymbol = (text: string, symbol: string): string => {
  return text.replaceAll(symbol, '');
}

enum Status {
  Loading = 'LOADING',
  Success = 'SUCCES',
  Error = 'ERROR'
}

enum TextFormat {
  UpperCase = 'UPPERCASE',
  LowerCase = 'LOWERCASE',
  Capitalize = 'CAPITALIZE'
}