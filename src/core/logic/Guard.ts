
export interface IGuardResult {
    succeeded: boolean;
    message?: string;
  }
  
  export interface IGuardArgument {
    argument: any;
    argumentName: string;
  }
  
  export type GuardArgumentCollection = IGuardArgument[];
  
  export class Guard {
    public static combine (guardResults: IGuardResult[]): IGuardResult {
      for (let result of guardResults) {
        if (result.succeeded === false) return result;
      }
  
      return { succeeded: true };
    }
  
    public static againstFalsyValues (argument: unknown, argumentName: string): IGuardResult {
      if (!Boolean(argument)) {
        return { succeeded: false, message: `${argumentName} is not provided or incorrect` }
      } else {
        return { succeeded: true }
      }
    }
  
    public static againstFalsyValuesBulk(args: GuardArgumentCollection): IGuardResult {
      for (const { argument, argumentName } of args) {
        const result = this.againstFalsyValues(argument, argumentName);
        if (!result.succeeded) return result;
      }
  
      return { succeeded: true }
    }
  
    public static isOneOf (value: any, validValues: any[], argumentName: string) : IGuardResult {
      let isValid = false;
      for (const validValue of validValues) {
        if (value === validValue) {
          isValid = true;
        }
      }
  
      if (isValid) {
        return { succeeded: true }
      } else {
        return { 
          succeeded: false, 
          message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".` 
        }
      }
    }
  
    public static inRange (num: number, min: number, max: number, argumentName: string) : IGuardResult {
      const isInRange = num >= min && num <= max;
      if (!isInRange) {
        return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.`}
      } else {
        return { succeeded: true }
      }
    }
  
    public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : IGuardResult {
      let failingResult: IGuardResult | null = null;
      for(let num of numbers) {
        const numIsInRangeResult = this.inRange(num, min, max, argumentName);
        if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
      }
  
      if (failingResult) {
        return { succeeded: false, message: `${argumentName} is not within the range.`}
      } else {
        return { succeeded: true }
      }
    }
  }