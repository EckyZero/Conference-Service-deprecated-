class NameParser {
    
    parseFirstName (fullName) {

        if (fullName === undefined) return null;
        if (typeof fullName !== 'string') return null;
    
        const firstName = trimName(names[0]);
                              
        return firstName;
    }
    
    parseMiddleName (fullName) {
    
        if (fullName === undefined) return null;
        if (typeof fullName !== 'string') return null;
    
        const names = fullName.split(' ');
    
        if (names.length < 1) return null;
    
        const middleName = trimName(names[1]);
                              
        return middleName;
    }
    
    parseLastName (fullName) {
        
        if (fullName === undefined) return null;
        if (typeof fullName !== 'string') return null;
    
        const names = fullName.split(' ');
    
        if (names.length < 2) return null;
    
        const lastName = trimName(names[2]);
                              
        return lastName;
    }
    
    trimName (name) {
    
        if (name === undefined) return null;
        if (typeof name !== 'string') return null;
    
        const trimmedName = name.replace(/./g, '')
                                .trim();
    
        return trimmedName;
    }
    
}

module.exports = NameParser;