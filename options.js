// option.js

function save_options() {
	// get handles from textarea
	var textarea = $('#handles');
	var handles = [];
	if(textarea.val().length > 0)
		handles = textarea.val().split("\n");
	
	// remove any empty elements
	handles.forEach(function(value, index, array) {
		if(value == "")
			array.splice(index, 1);
	});
	
	// save handles to storage
	chrome.storage.sync.set({ handles: handles }, function() { window.close(); });
}

function restore_options() {
	// get the list of blocked handles from storage
	var textarea = $('#handles');
	chrome.storage.sync.get('handles', function(items) {
		if(items.handles)
			textarea.val(items.handles.join("\n"));
	});
}

$(document).ready(function() {
	$('#save').on('click', save_options);
	restore_options();
});