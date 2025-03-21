import fs from 'fs';

const rawData = fs.readFileSync('./seeds/seedData.json', 'utf8');
const seedData = JSON.parse(rawData);

const commentsData = seedData.comments;
const postsData = seedData.posts;
const usersData = seedData.users;

export { commentsData, postsData, usersData };