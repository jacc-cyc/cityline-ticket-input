chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'pageLoaded' || request.action === "updateSelect" || request.action === "divChanged") {
        console.log(request.action)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: request.action === "pageLoaded" ? updateSelectElement : updateSelectElementNoTimeOut,
          args: request.action === 'pageLoaded' ? ["2"] : [request.value]
        });
      });
    }
  });

//   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log('onchange 123')
//     if (changeInfo.status === 'complete' && tab.status === 'complete') {
//         console.log('onchange success 123')
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.scripting.executeScript({
//               target: {tabId: tabId},
//               function: updateSelectElement,
//               args: ["2"]
//             });
//           });
//     //   updateSelectElement(tabId, "2");  // Set default to Option 2
//     }
//   });
  
   function updateSelectElement(value) {
    console.log('updateSelectElement: ' + value )
    setTimeout(function() {
        console.log('After sleep');
        // Perform other actions here after the sleep
        let ticketTypeSelect = document.getElementById('ticketType0');
        if(ticketTypeSelect) {
          ticketTypeSelect.value = value;
          
          // Trigger a change event
          let event = new Event('change');
          ticketTypeSelect.dispatchEvent(event);
          console.log("Select element updated with value:", value);
        } else {
          console.log("ticketType0 element not found");
        }
      }, 350);
  }

  function updateSelectElementNoTimeOut(value) {
    console.log('updateSelectElement: ' + value )
    console.log('After sleep');
        // Perform other actions here after the sleep
        let ticketTypeSelect = document.getElementById('ticketType0');
        if(ticketTypeSelect) {
          ticketTypeSelect.value = value;
          
          // Trigger a change event
          let event = new Event('change');
          ticketTypeSelect.dispatchEvent(event);
          console.log("Select element updated with value:", value);
        } else {
          console.log("ticketType0 element not found");
        }
  }
