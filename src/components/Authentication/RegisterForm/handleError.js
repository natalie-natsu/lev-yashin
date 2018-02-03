export default function handleRegisterError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'EMAIL_ALREADY_USED': submissionError.email = 'alreadyUsed'; break;
        default: submissionError._error = 'notPrecise';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
