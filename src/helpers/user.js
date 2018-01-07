// eslint-disable-next-line import/prefer-default-export
export function getName(email, userName, firstName, lastName) {
    if (firstName && lastName) { return `${firstName} ${lastName}`; }
    return email;
}
