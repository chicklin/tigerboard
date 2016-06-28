$(document).ready(function() {
	// get the number of threads and messages blocked from storage
	chrome.storage.sync.get('threads_blocked', function(items) {
		$('#threads_blocked').html(items.threads_blocked);
	});
	chrome.storage.sync.get('messages_blocked', function(items) {
		$('#messages_blocked').html(items.messages_blocked);
	});
	
	$('#options').on('click', function() {
		//chrome.tabs.create({ url: 'chrome://extensions/?options=oidgmhmghcnkdkefiojaflpanlgncgba' });
		chrome.tabs.create({ url: 'chrome://extensions/?options=bnmaiogedflaibmafmidnmafmmplbail' });
	});
});
