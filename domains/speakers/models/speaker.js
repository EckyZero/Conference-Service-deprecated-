'use strict';

/**
 * Speaker object (aka the person who gave a talk)
 */
class Speaker {
  // enum of all possible titles
  static TITLES = {
    BROTHER: 'Brother',
    SISTER: 'Sister',
    ELDER: 'Elder',
  };

  title;
  preferredName;
  firstName;
  middleName;
  lastName;
  role;
}

module.exports = Speaker;
