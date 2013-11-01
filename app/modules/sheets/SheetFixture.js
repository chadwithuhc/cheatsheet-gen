var Collection = require('core/Collection');
var SheetModel = require('./SheetModel');
var SheetItemModel = require('./SheetItemModel');
//var SheetItemAssignmentModel = require('./SheetItemAssignmentModel');
var SheetGroupModel = require('./SheetGroupModel');
//var SheetGroupAssignmentModel = require('./SheetGroupAssignmentModel');


var SheetFixture = function () {
	
	// Final mock DB
	var Fixture = {};
	
	var sheets = [
		{id: true, title: 'Getters/Setters', description: 'Available options for getting and setting values', groups: null},
		{id: true, title: 'Lifecycle Methods', description: 'Available options for life cycle', groups: null},
		{id: true, title: 'Templating', description: 'Common templating methods and examples', groups: null},
		{id: true, title: 'Shortcuts', description: 'A handful of shortcuts for yall', groups: null},
		{id: true, title: 'Framework Syntax', description: 'A cheatsheet for all your personal needs', groups: null},
		{id: true, title: 'Colorsheet', description: 'A collection of HEX codes', groups: null},
		{id: true, title: 'Bash Commands for Beginners', description: 'All of the basic commands for you n00bs', groups: null},
	];
	
	var sheetItems = [
		{id: true, name: 'git st', caption: 'Check the status'},
		{id: true, name: 'git commit', caption: 'Commit pending changes'},
		{id: true, name: 'git checkout', caption: 'Checkout a branch, man'},
		{id: true, name: 'git branch', caption: 'List some branches'},
		{id: true, name: '$this->template->title()', caption: 'Get the title of the template'},
		{id: true, name: '$this->template->set_title()', caption: 'Set the title of the template'},
		{id: true, name: '$this->template->set_metadata()', caption: 'Set the metadata for the page'},
	];
	
	var sheetItemGroups = [
		{id: true, name: 'Constructor Methods', order: null, items: null },
		{id: true, name: 'Common Selectors', order: null, items: null },
		{id: true, name: 'Utilities', order: null, items: null },
		{id: true, name: 'Extensions', order: null, items: null },
		{id: true, name: 'Plugins', order: null, items: null },
	];
	
	var sheetItemGroupAssignment = [
		{id: true, group_id: null, item_id: null, order: null }
	];
	
	var sheetGroupAssignment = [
		{id: true, sheet_id: null, group_id: null, order: null }
	];


	/**
	 * Utility Methods
	 */
	
	// Generate a unique ID
	var id = function () {
		return _.uniqueId('id');
	};

	// Get a random entry from an array
	var getRandom = function(arr) {
		var item = _.chain(arr).shuffle().first().value();
		if (item.id) {
			item.id = id();
		}
		return item;
	};
	
	var addDataToFixture = function (data, type) {
		var table = false;

		if (type === SheetModel) {
			table = 'sheets';
		} else if (type === SheetItemModel) {
			table = 'sheet_items';
		} else if (type === SheetGroupModel) {
			table = 'sheet_item_groups';
		} else {
			table = type;
		}
		
		if (table) {
			if (typeof Fixture[table] === 'undefined') {
				Fixture[table] = [];
			}
			
			Fixture[table].push(data);
		}
		
		return data;
	};


	/**
	 * Generators
	 */
	
	// Sheets
	var generateSheet = function () {
		var data = getRandom(sheets);
		return new SheetModel(addDataToFixture(data, SheetModel));
	};

	var generateFullSheet = function (num_of_groups, num_of_items) {
		// create a sheet
		var sheet = generateSheet();
		// create group with items
		var groups = [];
		_.times(num_of_items || 5, function (i) {
			var group = generateGroupWithItems(num_of_items);
			groups.push(group);
			generateGroupAssignment({
				sheet_id: sheet.get('id'),
				group_id: group.get('id'),
				order: i
			});
		});
		
		sheet.set('groups', new Collection(groups, { model: SheetGroupModel }));
		
		return sheet;
	};
	
	// Items
	var generateItem = function () {
		var data = getRandom(sheetItems);
		return new SheetItemModel(addDataToFixture(data, SheetItemModel));
	};
	
	var generateItemAssignment = function (options) {
		var itemAssignment = getRandom(sheetItemGroupAssignment);
		
		return addDataToFixture(_.defaults(itemAssignment, options), 'sheet_item_group_assignments');
	}
	
	// Groups
	var generateGroup = function () {
		var data = getRandom(sheetItemGroups);
		return new SheetGroupModel(addDataToFixture(data, SheetGroupModel));
	};
	
	var generateGroupWithItems = function (num_of_items) {
		var group = generateGroup();
		var items = [];
		_.times(num_of_items || 5, function (i) {
			var item = generateItem();
			items.push(item);
			generateItemAssignment({
				item_id: item.get('id'),
				group_id: group.get('id'),
				order: i
			});
		});
		
		group.set('items', new Collection(items, { model: SheetItemModel }));
		
		return group;
	};
	
	var generateGroupAssignment = function (options) {
		var groupAssignment = getRandom(sheetGroupAssignment);
		return addDataToFixture(_.defaults(groupAssignment, options), 'sheet_group_sheet_assignments');
	};
	
	
	
	return {
		
		Fixture: function () {
			return Fixture;
		},
		
		Sheet: function () {
			return generateSheet();
		},
		
		FullSheet: function (num_of_groups, num_of_items) {
			return generateFullSheet(num_of_groups, num_of_items);
		},
		
		Item: function () {
			return generateItem();
		}
		
		
	};
};

module.exports = SheetFixture;
