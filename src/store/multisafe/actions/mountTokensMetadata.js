import { action } from 'easy-peasy';

export const mountTokensMetadata = action((slice, payload) => {
    const { fungibleTokensMetadata } = payload;
    slice.general.fungibleTokensMetadata = fungibleTokensMetadata;
});
