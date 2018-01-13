export function getName({ email, userName, firstName, lastName }) {
    if (firstName && lastName) { return `${firstName} ${lastName}`; }
    return userName || email;
}

export function getPublicName({ userName, firstName }) {
    return firstName || userName;
}
