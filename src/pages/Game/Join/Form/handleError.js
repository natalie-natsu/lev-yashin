export default function handleCreateGameError(response) {
    const submissionError = {};
    switch (response.statusCode) {
    case 400:
        switch (response.message) {
        case 'GAME_ALREADY_JOINED': submissionError._error = 'alreadyJoined'; break;
        case 'GAME_ALREADY_STARTED': submissionError._error = 'alreadyStarted'; break;
        case 'GAME_NOT_FOUND': submissionError._error = 'notFound'; break;
        default: submissionError._error = 'notPrecise';
        } break;
    default: submissionError._error = 'notPrecise';
    }

    return submissionError;
}
