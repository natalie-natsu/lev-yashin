export default function handleSignInError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'Invalid email.': submissionError.email = 'incorrect'; break;
        case 'Invalid password.': submissionError.password = 'incorrect'; break;
        default: submissionError._error = 'badRequest';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
