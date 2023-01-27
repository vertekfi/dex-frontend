export enum LockType {
  CREATE_LOCK = 'createLock',
  EXTEND_LOCK = 'extendLock',
  INCREASE_LOCK = 'increaseLock',
}

export const LockTitles = {
  createLock: {
    default: 'Locking preview',
    confirmed: 'Locking confirmed',
  },
  extendLock: {
    default: 'Extend lock preview preview',
    confirmed: 'Extend lock preview confirmed',
  },
  increaseLock: {
    default: 'Increase lock amount',
    confirmed: 'Increase lock amount confirmed',
  },
};
