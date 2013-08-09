var SheetsModel = require('models/Sheets');
var SheetsCollection = require('models/Sheets');

describe('SheetsCollection', function(done){

	var self = this;

	beforeEach(function(){
		self.model = new SheetsModel();
		self.collection = new SheetsCollection();
	});

	afterEach(function(){
		self.model.dispose();
		self.collection.dispose();
	});

});
