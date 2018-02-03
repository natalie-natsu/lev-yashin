export default function handleCreateGameError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'OLD_PASSWORD_INVALID': submissionError.oldPassword = 'incorrect'; break;
        default: submissionError._error = 'notPrecise';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
