export const RESET_MESSAGES = 'RESET_MESSAGES';

export function resetMessages(scope, then) {
    return {
        type: RESET_MESSAGES,
        scope,
        then,
    };
}
