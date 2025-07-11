export const Debounce = (time: number): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      await new Promise((resolve) => setTimeout(resolve, time));
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
};
