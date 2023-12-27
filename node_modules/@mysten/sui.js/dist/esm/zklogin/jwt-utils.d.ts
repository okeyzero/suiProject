export type Claim = {
    value: string;
    indexMod4: number;
};
export declare function extractClaimValue<R>(claim: Claim, claimName: string): R;
