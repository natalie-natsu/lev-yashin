export default function handleUpdateProfileError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'INVALID_USERNAME': submissionError.userName = 'invalid'; break;
        default: submissionError._error = 'badRequest';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
