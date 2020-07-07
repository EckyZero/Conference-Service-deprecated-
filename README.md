# Conference Service

A series of open REST APIs that serves topics, talks, and speaker information regarding General Conference sessions for members of The Church of Jesus Christ of Latter-day Saints

## Using the API

1. Request an API key from [help.wardbook@gmail.com](help.wardbook@gmail.com)
2. Add the API key to your header 
3. Make a request with base URL [https://api.conference.wardbook.com/{version}/{domain}](https://api.conference.wardbook.com/{version}/{domain}) where {version} and {domain} specified below

## Services
See below for a description of how to user the service. If desired, you can also reference the Swagger [here](https://github.com/EckyZero/Conference-Service-Infra/blob/dev/swagger.yaml)

### /Topics

"Topics" are categories of Conference talks centered on a certain theme. Content in this API is derived from the Church's site [here](https://www.churchofjesuschrist.org/general-conference/topics?lang=eng).

**URL**: https://api.conference.wardbook.com/1.0.0/topics?source=web

**Query Parameters**: 

| Key  | Value | Required | Description |
| ------------- | ------------- | ------------- | ------------- |
| source | *web* or *cache*  | true | web = call the Church's data source directly (always up-to-date but slow), or cache = a cached version of the data (always fast, but may not be up-to-date)


#### Example


```bash
# Simple HTTP GET Request
curl https://api.conference.wardbook.com/1.0.0/topics?source=web

# Response is an array of "topics"
## The "tag" element can be used to query the /talk domain for talks relative to this topic
[{
    "title": "Aaronic Priesthood",
    "tag": "aaronic-priesthood",
    "talksUrl": "https://www.churchofjesuschrist.org/general-conference/topics/Aaronic-Priesthood?lang=eng&encoded=true",
    "talksCount": 10
}, {
    "title": "adversity",
    "tag": "adversity",
    "talksUrl": "https://www.churchofjesuschrist.org/general-conference/topics/adversity?lang=eng",
    "talksCount": 270
}, {
    "title": "Atonement",
    "tag": "atonement",
    "talksUrl": "https://www.churchofjesuschrist.org/general-conference/topics/Atonement?lang=eng",
    "talksCount": 262
}, ...]
```

### /Talks
"Talks" represent each speech given in General Conference, and goes back as far as the church supports online (example [here](https://www.churchofjesuschrist.org/general-conference/topics/faith?lang=eng))

**URL**: https://api.conference.wardbook.com/1.0.0/topics?source=web

**Query Parameters**: 

| Key  | Value | Required | Description |
| ------------- | ------------- | ------------- | ------------- |
| source | *web* or *cache*  | true | web = call the Church's data source directly (always up-to-date but slow), or cache = a cached version of the data (always fast, but may not be up-to-date)
| topic | aaronic-priesthood, abortion, abuse, accountability, activation, adam-and-eve, addiction, adversity, agency, angels, anger, animals, apostasy, articles-of-faith, athletics, atonement, attitude, authority, baptism, belonging, bible, bishops, blessings, book-of-mormon, brigham-young, brotherhood, character, charity, children, christianity, christmas, church-attendance, church-callings, church-doctrine, church-growth, church-history, church-leaders, church-leadership, church-meetings, church-membership, church-organization, commandments, commitment, communication, compassion, confidence, confirmation, conscience, consecration, contention, conversion, convert-retention, councils, couple-missionaries, courage, covenants, covetousness, creation, creativity, criticism, curriculum, dating, death, dedication, depression, disabilities, discipleship, disciplinary-councils, discipline, dispensations, divine-nature, divorce, doctrine-and-covenants, duty, easter, education, elderly, employment, endurance, environment, eternal-life, evil, example, excellence, exodus, ezra-taft-benson, faith, fall, false-doctrines, family, family-history, family-home-evening, fasting, fatherhood, fear, fellowshipping, financial-management, first-presidency, first-vision, foreordination, forgiveness, freedom, friendship, gambling, gathering, general-conference, generosity, goals, god-the-father, godhead, good-samaritan, gordon-b.-hinckley, government, grace, greed, habits, happiness, harold-b.-lee, healing, health, heavenly-father, heroes, holidays, holiness, holy-ghost, holy-land, home, home-teaching, homosexuality, honesty, hope, house-of-israel, howard-w.-hunter, humanitarian-aid, humility, humor, idol-worship, individual-worth, inspiration, institute, integrity, jesus-christ, joseph-smith, joy, justice, kindness, kingdom-of-god, knowledge, languages, last-days, laws, leadership, learning, light-of-christ, listening, literacy, literature, loneliness, love, loyalty, marriage, media, meekness, melchizedek-priesthood, mental-health, mental-illness, mercy, military, ministering, miracles, mission-of-the-church, missionary-work, modesty, morality, mortality, motherhood, music, name-of-church, native-americans, neighbors, new-testament, nonmembers, obedience, offense, opposition, ordinances, parenthood, parents, passover, patience, patriarchal-blessings, patriotism, peace, peer-pressure, perspective, pioneers, plan-of-salvation, pornography, poverty, prayer, premortal-existence, preparation, pride, priesthood, priesthood-blessings, priesthood-quorums, primary, priorities, profanity, promptings, prophecy, prophets, quorum-of-the-twelve-apostles, quorums-of-seventy, relief-society, religion, religious-freedom, repentance, respect, responsibility, restoration, resurrection, revelation, reverence, righteousness, sabbath, sacrament, sacredness, sacrifice, safety, satan, scouting, scripture-study, scriptures, sealings, second-coming, self-control, self-esteem, self-reliance, seminary, service, sin, single-members, sisterhood, social-services, spencer-w.-kimball, spirit-world, spiritual-gifts, spirituality, standards, stress, success, sunday-school, tabernacle-choir, talents, teaching, technology, temple, temple-square, temple-work, temples, temptation, testimony, thomas-s.-monson, time-management, tithing, tolerance, traditions, trust, truth, u.s.-constitution, understanding, unity, values, violence, virtue, visiting-teaching, wealth, welfare, wilford-woodruff, wisdom, womanhood, women, word-of-wisdom, work, worldliness, worship, worthiness, young-adults, young-single-adults, young-women, youth, zion | false | the topic to query by

#### Example


```bash
# Simple HTTP GET Request
curl https://api.conference.wardbook.com/1.0.0/talks?source=web&topic=faith

# Response is an array of "topics"
## The "tag" element can be used to query the /talk domain for talks relative to this topic
[
  {
    "title": "What Every Aaronic Priesthood Holder Needs to Understand",
    "description": "Brother Holmes teaches that Aaronic Priesthood holders have an important role in helping others to receive the Savior’s atoning power in their lives.",
    "quote": "Your Aaronic Priesthood ordination is central to helping God’s children receive Christ’s atoning power.",
    "sessionOrder": 0,
    "session": {
      "name": "General Priesthood Session",
      "conferenceOrder": 2,
      "conference": {
        "year": 2018,
        "month": 4
      }
    },
    "speaker": {
      "title": "Brother",
      "preferredName": "Douglas D. Holmes",
      "firstName": "Douglas",
      "middleName": "D",
      "lastName": "Holmes",
      "role": "First Counselor in the Young Men General Presidency"
    },
    "thumbnailUrl": "https://mediasrv.churchofjesuschrist.org/media-services/GC/thumbnail/5761611624001",
    "detailUrl": "https://www.churchofjesuschrist.org/general-conference/2018/04/what-every-aaronic-priesthood-holder-needs-to-understand?lang=eng"
  },...]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/EckyZero/Talk-Service/blob/dev/LICENSE)
