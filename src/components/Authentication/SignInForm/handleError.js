export default function handleSignInError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'INVALID_EMAIL': submissionError.email = 'incorrect'; break;
        case 'INVALID_PASSWORD': submissionError.password = 'incorrect'; break;
        default: submissionError._error = 'badRequest';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
