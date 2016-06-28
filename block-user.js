// block a user by removing their posts

chrome.storage.sync.get('handles', function(items) {
	// get list of handles from sync storage
	var blocked_handles = items.handles;
	if(blocked_handles == undefined || blocked_handles.length < 1 )  // undefined or empty
		return;

	// counting how many posts we hide
	var thread_counter = 0;
	var message_counter = 0;

	// first, hide all threads started by blocked handles
	var threads = $('.thread');
	threads.each(function(index, arr) {
		// get handle
		var handle = $(this).find(':first-child').find('.handle').html();
		
		// see if this thread is by a blocked handled
		if($.inArray(handle, blocked_handles) > -1) {
			var num_messages = $(this).children().length;
			$(this).hide(); // hide this thread
			thread_counter++; // increment our counter every time we hide a node
			message_counter += num_messages; // increment our message count by the number of messages in the thread
		}
	});
	
	// second, clean up remaining messages and replies
	var messages = $('.msgline');
	messages.each(function(index, arr) {
		// get handle
		var handle = $(this).find('.handle').html();
		
		// see if this message is by a blocked handled
		if($.inArray(handle, blocked_handles) > -1) {
			$(this).hide(); // it is, so hide this one
			message_counter++; // increment our counter every time we hide a node
			
			// extract its indent token, first occurrence of a non-whitespace character 
			var token = $(this).text().search(/\S/);
			
			// get next sibling
			var next = $(this).next();
			
			// loop and remove until we find a message at the same level
			while(next != null && next.text().search(/\S/) > token) {
				next.hide();
				next = next.next();
			}
		}
	});

	// update popup with thread and message counts
	chrome.storage.sync.set({ threads_blocked: thread_counter, messages_blocked: message_counter });

});