//   window.addEventListener('load', function () {
//     console.log('okokokok')
//     chrome.runtime.sendMessage({action: "pageLoaded"});
//   })

// document.onload = function(){
//     console.log('okokokok')
//     chrome.runtime.sendMessage({action: "pageLoaded"});
// };

// document.addEventListener("DOMContentLoaded", function(){
//     console.log('okokokok')
//     chrome.runtime.sendMessage({action: "pageLoaded"});
// });

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    chrome.runtime.sendMessage({action: "pageLoaded"});
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        chrome.runtime.sendMessage({action: "pageLoaded"});
    });
}

// document.getElementById('ticketType0').addEventListener('change', function() {
//     console.log("ticketType0 changed")
//     let selectedValue = this.value;
//     if (selectedValue === 0) {
//         console.log("update ticketType0 from 0 to 2")
//         chrome.runtime.sendMessage({action: "updateSelect", value: "2"});
//     }
// });

// Function to handle the mutation event
function handleMutation(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.target.classList.contains('discount-degree')) {
        // Detected changes in the target div with the specified class name
        console.log('Div with class "discount-degree" has changed');
        // Perform your desired action here
        chrome.runtime.sendMessage({action: "divChanged", value: "2"});
      }
    }
  }
  
  // Create a MutationObserver instance
  const observer = new MutationObserver(handleMutation);
  
  // Function to start observing the target div
  function startObserving() {
    // Find the target div by its class name
    const targetDiv = document.querySelector('.discount-degree');
  
    // Start observing the target div for changes
    observer.observe(targetDiv, {
      childList: true,
      subtree: true,
      attributes: true, // If you also want to monitor attribute changes
      attributeFilter: ['class'] // Specify the attributes to monitor (e.g., 'class')
    });
  }

  setTimeout(startObserving, 500);