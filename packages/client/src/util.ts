export const evTarget = <T>(fn: (value: T) => any) => (
  event: React.ChangeEvent<HTMLElement>,
) => {
  const { value } = event.target as any;
  if (value) {
    fn(value);
  } else {
    throw new Error('Event must have target.value');
  }
};
