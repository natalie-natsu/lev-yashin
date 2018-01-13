export default function handleSignInError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'Email already used.': submissionError.email = 'alreadyUsed'; break;
        default: submissionError._error = 'notPrecise';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
