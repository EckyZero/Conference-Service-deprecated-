const parseFirstName = function (fullName) {

    if (fullName === undefined) return null;
    if (typeof fullName !== 'string') return null;

    const firstName = trimName(names[0]);
                          
    return firstName;
}

const parseMiddleName = function (fullName) {

    if (fullName === undefined) return null;
    if (typeof fullName !== 'string') return null;

    const names = fullName.split(' ');

    if (names.length < 1) return null;

    const middleName = trimName(names[1]);
                          
    return middleName;
}

const parseLastName = function (fullName) {
    
    if (fullName === undefined) return null;
    if (typeof fullName !== 'string') return null;

    const names = fullName.split(' ');

    if (names.length < 2) return null;

    const lastName = trimName(names[2]);
                          
    return lastName;
}

const trimName = function (name) {

    if (name === undefined) return null;
    if (typeof name !== 'string') return null;

    const trimmedName = name.replace(/./g, '')
                            .trim();

    return trimmedName;
}


module.exports = {
    parseFirstName:  parseFirstName,
    parseMiddleName: parseMiddleName,
    parseLastName:   parseLastName,
    trimName:        trimName
}