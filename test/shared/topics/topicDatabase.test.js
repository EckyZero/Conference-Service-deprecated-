'use strict';

const _expect = require('chai').expect;
const TopicDatabase = require('../../domains/topics/topicDatabase');

describe('TopicDatabase', function() {
  describe('create', function() {
    it('create table if doesnt exist', function() {
      const topicDb = new TopicDatabase();
      topicDb.create();
    });
    it('does not create table if does exist', function() {

    });
  });
  describe('upsert', function() {
    it('insert record if it does not exist', function() {

    });
    it('update record if it does exist', function() {

    });
  });
  describe('upsertAll', function() {
    it('records that dont exist are inserted', function() {

    });
    it('records that do exist are updated', function() {

    });
  });
});
